import { AttendanceRecord, AttendanceStats } from './types';
import { subDays, addDays } from 'date-fns';

const today = new Date();
const records: AttendanceRecord[] = [];

// Generate attendance records for the last 60 days
for (let i = 0; i < 60; i++) {
  const date = subDays(today, 60 - i);
  const dayOfWeek = date.getDay();
  
  // Only weekdays
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    const subjects = ['Mathématiques', 'Physique', 'Français', 'Anglais', 'Histoire'];
    const teachers = ['M. Dupont', 'Mme. Martin', 'M. Bernard', 'Mme. Dubois', 'M. Leroy'];
    
    subjects.forEach((subject, idx) => {
      let status: AttendanceRecord['status'] = 'present';
      const rand = Math.random();
      
      if (rand < 0.05) status = 'absent';
      else if (rand < 0.10) status = 'late';
      else if (rand < 0.12) status = 'excused';
      
      records.push({
        id: `${i}-${idx}`,
        date: date.toISOString(),
        subject,
        status,
        teacher: teachers[idx],
        notes: status === 'absent' ? 'Absence non justifiée' : undefined
      });
    });
  }
}

export const mockAttendanceRecords: AttendanceRecord[] = records;

export const mockAttendanceStats: AttendanceStats = {
  totalDays: 45,
  presentDays: 40,
  absentDays: 3,
  lateDays: 2,
  excusedDays: 2,
  attendanceRate: 88.9,
  bySubject: [
    {
      subject: 'Mathématiques',
      attendanceRate: 95.0,
      totalClasses: 20,
      presentClasses: 19
    },
    {
      subject: 'Physique',
      attendanceRate: 90.0,
      totalClasses: 20,
      presentClasses: 18
    },
    {
      subject: 'Français',
      attendanceRate: 85.0,
      totalClasses: 20,
      presentClasses: 17
    },
    {
      subject: 'Anglais',
      attendanceRate: 92.5,
      totalClasses: 20,
      presentClasses: 18.5
    },
    {
      subject: 'Histoire',
      attendanceRate: 87.5,
      totalClasses: 20,
      presentClasses: 17.5
    }
  ]
};

