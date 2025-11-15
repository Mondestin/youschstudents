import { format, isSameDay } from "date-fns";
import { CalendarEvent, TimeSlot } from "@/types/calendar";
import { EventItem } from "./EventItem";
import { cn } from "@/lib/utils";

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
}

const timeSlots: TimeSlot[] = Array.from({ length: 13 }, (_, i) => ({
  hour: i + 8,
  label: `${i + 8}:00 ${i + 8 >= 12 ? "PM" : "AM"}`,
}));

export const DayView = ({ date, events, onEventClick }: DayViewProps) => {
  const dayEvents = events.filter((event) => {
    if (!event.date) return false;
    return isSameDay(new Date(event.date), date);
  });

  const getEventsForHour = (hour: number) => {
    return dayEvents.filter((event) => {
      if (!event.startTime) return false;
      const eventHour = parseInt(event.startTime.split(":")[0]);
      return eventHour === hour;
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</h2>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[600px]">
          {timeSlots.map((slot) => {
            const hourEvents = getEventsForHour(slot.hour);
            return (
              <div key={slot.hour} className="flex border-b">
                <div className="w-20 flex-shrink-0 border-r p-2">
                  <span className="text-xs text-t-tertiary">{slot.label}</span>
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
