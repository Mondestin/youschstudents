'use client';

import { DayData } from '@/types/calendar';
import { EventItem, EventDot } from './EventItem';
import { cn } from '@/lib/utils';
import { isToday } from 'date-fns';

interface CalendarDayProps {
  day: DayData;
  onEventClick?: (eventId: string) => void;
}

export const CalendarDay = ({ day, onEventClick }: CalendarDayProps) => {
  const visibleEvents = day.events.slice(0, 3);
  const remainingCount = day.events.length - 3;
  const isCurrentDay = day.fullDate && isToday(day.fullDate);

  return (
    <div
      className={cn(
        'flex flex-col gap-1 py-1.5 lg:py-2',
        !day.isCurrentMonth && 'opacity-50',
        isCurrentDay && 'bg-[var(--primary-subtle-light)]'
      )}
    >
      <span
        className={cn(
          'h-6 px-1 text-xs font-semibold lg:px-2',
          isCurrentDay && 'text-primary font-bold'
        )}
      >
        {day.date}
      </span>
      <div className="flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0">
        {[0, 1, 2].map((index) => (
          <div key={index} className="lg:flex-1">
            {visibleEvents[index] && (
              <>
                <EventDot color={visibleEvents[index].color} />
                <EventItem
                  event={visibleEvents[index]}
                  onClick={() => onEventClick?.(visibleEvents[index].id)}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <p className="h-4.5 px-1.5 text-xs font-semibold text-muted-foreground">
        {remainingCount > 0 && (
          <>
            <span className="sm:hidden">+{remainingCount}</span>
            <span className="hidden sm:inline">{remainingCount} de plus...</span>
          </>
        )}
      </p>
    </div>
  );
};

