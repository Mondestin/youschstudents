import { CalendarEvent } from '@/types/calendar';
import { addDays, setHours, setMinutes, format, startOfDay } from 'date-fns';

// Seeded random number generator for consistent results between server and client
function seededRandom(seed: number): () => number {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function generateSampleEvents(): CalendarEvent[] {
  const today = new Date();
  const events: CalendarEvent[] = [];
  const colors: CalendarEvent['color'][] = ['green', 'red', 'blue', 'purple', 'yellow', 'gray'];
  const subjects = [
    { name: 'Mathématiques', teacher: 'M. Dupont', location: 'Salle 101' },
    { name: 'Physique', teacher: 'Mme. Martin', location: 'Labo Physique' },
    { name: 'Chimie', teacher: 'M. Bernard', location: 'Labo Chimie' },
    { name: 'Français', teacher: 'Mme. Dubois', location: 'Salle 205' },
    { name: 'Histoire', teacher: 'M. Leroy', location: 'Salle 103' },
    { name: 'Anglais', teacher: 'Mme. Wilson', location: 'Salle 301' },
    { name: 'SVT', teacher: 'M. Moreau', location: 'Labo SVT' }
  ];

  const attendanceStatuses: Array<'present' | 'absent' | 'late' | 'excused' | 'not_signed'> = [
    'present',
    'absent',
    'late',
    'excused',
    'not_signed'
  ];

  const times = [
    { start: '08:00', end: '09:30' },
    { start: '09:45', end: '11:15' },
    { start: '11:30', end: '13:00' },
    { start: '14:00', end: '15:30' },
    { start: '15:45', end: '17:15' }
  ];

  // Generate events for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = addDays(today, i);
    const dayOfWeek = date.getDay();

    // Only weekdays (Monday = 1 to Friday = 5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Use date as seed for consistent random generation
      const dateSeed = startOfDay(date).getTime();
      const random = seededRandom(dateSeed);
      
      const numCourses = Math.floor(random() * 3) + 1; // 1-3 courses per day
      
      for (let j = 0; j < numCourses; j++) {
        const randomTime = times[Math.floor(random() * times.length)];
        const randomSubject = subjects[Math.floor(random() * subjects.length)];
        const randomColor = colors[Math.floor(random() * colors.length)];
        const randomAttendance = attendanceStatuses[Math.floor(random() * attendanceStatuses.length)];

        const startHour = parseInt(randomTime.start.split(':')[0]);
        const startMin = parseInt(randomTime.start.split(':')[1]);
        const endHour = parseInt(randomTime.end.split(':')[0]);
        const endMin = parseInt(randomTime.end.split(':')[1]);

        const startDateTime = setMinutes(setHours(date, startHour), startMin);
        const endDateTime = setMinutes(setHours(date, endHour), endMin);

        // Format time for display (HH:mm format doesn't need locale)
        const timeDisplay = `${format(startDateTime, 'HH:mm')} - ${format(endDateTime, 'HH:mm')}`;

        events.push({
          id: `${i}-${j}`,
          title: randomSubject.name,
          date: date.toISOString(),
          startTime: randomTime.start,
          endTime: randomTime.end,
          time: timeDisplay,
          color: randomColor,
          teacher: randomSubject.teacher,
          location: randomSubject.location,
          attendanceStatus: randomAttendance
        });
      }
    }
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

