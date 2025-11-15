'use client';

import { DayData } from '@/types/calendar';
import { CalendarDay } from './CalendarDay';

interface MonthViewProps {
  days: DayData[];
  onEventClick?: (eventId: string) => void;
}

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export const MonthView = ({ days, onEventClick }: MonthViewProps) => {
  return (
    <div>
      {/* Week day headers */}
      <div className="grid grid-cols-7 divide-x border-b">
        {weekDays.map((day) => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 overflow-hidden border-b lg:border-b-0">
        {days.map((day, index) => (
          <div
            key={`${day.fullDate?.toISOString() || day.date}-${index}`}
            className={`
              ${index % 7 !== 0 ? 'border-l' : ''}
              ${index >= 7 ? 'border-t' : ''}
            `}
          >
            <CalendarDay day={day} onEventClick={onEventClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

