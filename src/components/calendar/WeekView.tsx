'use client';

import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, TimeSlot } from '@/types/calendar';
import { EventItem } from './EventItem';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  weekDays: Date[];
  events: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
}

const timeSlots: TimeSlot[] = Array.from({ length: 13 }, (_, i) => ({
  hour: i + 8,
  label: `${i + 8}:00`,
}));

export const WeekView = ({ weekDays, events, onEventClick }: WeekViewProps) => {
  const getEventsForDayAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      if (!event.date || !event.startTime) return false;
      const eventDate = new Date(event.date);
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return isSameDay(eventDate, date) && eventHour === hour;
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="flex border-b sticky top-0 bg-background z-10 shadow-sm">
        <div className="w-20 flex-shrink-0 border-r bg-background p-2"></div>
        {weekDays.map((day) => {
          const isCurrentDay = isSameDay(day, new Date());
          return (
            <div
              key={day.toISOString()}
              className={cn(
                'flex-1 border-l p-2 text-center min-w-[120px] bg-background',
                isCurrentDay && 'bg-[var(--primary-subtle-light)]'
              )}
            >
              <div className="text-xs text-muted-foreground">{format(day, 'EEE', { locale: fr })}</div>
              <div
                className={cn(
                  'text-lg font-semibold',
                  isCurrentDay && 'text-primary font-bold'
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[900px]">
          {timeSlots.map((slot) => (
            <div key={slot.hour} className="flex border-b">
              <div className="w-20 flex-shrink-0 border-r p-2">
                <span className="text-xs text-muted-foreground">{slot.label}</span>
              </div>
              {weekDays.map((day) => {
                const dayEvents = getEventsForDayAndHour(day, slot.hour);
                return (
                  <div
                    key={`${day.toISOString()}-${slot.hour}`}
                    className="flex-1 border-l p-2 min-h-[80px] min-w-[120px]"
                  >
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="cursor-pointer text-xs"
                          onClick={() => onEventClick?.(event.id)}
                        >
                          <div className="truncate">
                            <EventItem event={event} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

