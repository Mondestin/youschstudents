import { format, isSameDay } from "date-fns";
import { CalendarEvent, TimeSlot } from "@/types/calendar";
import { EventItem } from "./EventItem";
import { cn } from "@/lib/utils";

interface WeekViewProps {
  weekDays: Date[];
  events: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
}

const timeSlots: TimeSlot[] = Array.from({ length: 13 }, (_, i) => ({
  hour: i + 8,
  label: `${i + 8}:00 ${i + 8 >= 12 ? "PM" : "AM"}`,
}));

export const WeekView = ({ weekDays, events, onEventClick }: WeekViewProps) => {
  const getEventsForDayAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      if (!event.date || !event.startTime) return false;
      const eventDate = new Date(event.date);
      const eventHour = parseInt(event.startTime.split(":")[0]);
      return isSameDay(eventDate, date) && eventHour === hour;
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="flex border-b sticky top-0 bg-background z-10">
        <div className="w-20 flex-shrink-0 border-r"></div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="flex-1 border-l p-2 text-center min-w-[120px]">
            <div className="text-xs text-t-tertiary">{format(day, "EEE")}</div>
            <div className="text-lg font-semibold">{format(day, "d")}</div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[900px]">
          {timeSlots.map((slot) => (
            <div key={slot.hour} className="flex border-b">
              <div className="w-20 flex-shrink-0 border-r p-2">
                <span className="text-xs text-t-tertiary">{slot.label}</span>
              </div>
              {weekDays.map((day) => {
                const dayEvents = getEventsForDayAndHour(day, slot.hour);
                return (
                  <div
                    key={`${day.toISOString()}-${slot.hour}`}
                    className="flex-1 border-l p-1 min-h-[80px] min-w-[120px]"
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
