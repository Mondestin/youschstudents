'use client';

import { format, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, TimeSlot } from '@/types/calendar';
import { EventItem } from './EventItem';
import { cn } from '@/lib/utils';

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
}

const timeSlots: TimeSlot[] = Array.from({ length: 13 }, (_, i) => ({
  hour: i + 8,
  label: `${i + 8}:00`,
}));

export const DayView = ({ date, events, onEventClick }: DayViewProps) => {
  const dayEvents = events.filter((event) => {
    if (!event.date) return false;
    return isSameDay(new Date(event.date), date);
  });

  const getEventsForHour = (hour: number) => {
    return dayEvents.filter((event) => {
      if (!event.startTime) return false;
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const isCurrentDay = isToday(date);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={cn(
          'border-b p-4 sticky top-0 bg-background z-10 shadow-sm',
          isCurrentDay && 'bg-[var(--primary-subtle-light)]'
        )}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
          </h2>
          {isCurrentDay && (
            <span className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              Aujourd'hui
            </span>
          )}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[600px]">
          {timeSlots.map((slot) => {
            const hourEvents = getEventsForHour(slot.hour);
            return (
              <div key={slot.hour} className="flex border-b">
                <div className="w-20 flex-shrink-0 border-r p-2">
                  <span className="text-xs text-muted-foreground">{slot.label}</span>
                </div>
                <div className="flex-1 p-2 min-h-[80px]">
                  <div className="space-y-1">
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className="cursor-pointer"
                        onClick={() => onEventClick?.(event.id)}
                      >
                        <EventItem event={event} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

