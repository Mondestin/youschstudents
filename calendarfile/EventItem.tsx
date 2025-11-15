import { CalendarEvent } from "@/types/calendar";
import { cn } from "@/lib/utils";

interface EventItemProps {
  event: CalendarEvent;
  onClick?: () => void;
}

const colorClasses = {
  green: "border-event-green-border bg-event-green-bg text-event-green",
  red: "border-event-red-border bg-event-red-bg text-event-red",
  blue: "border-event-blue-border bg-event-blue-bg text-event-blue",
  purple: "border-event-purple-border bg-event-purple-bg text-event-purple",
  yellow: "border-event-yellow-border bg-event-yellow-bg text-event-yellow",
  gray: "border-event-gray-border bg-event-gray-bg text-event-gray",
};

export const EventItem = ({ event, onClick }: EventItemProps) => {
  const baseClasses =
    "mx-1 h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs";

  if (event.spanDays) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={cn(
          baseClasses,
          colorClasses[event.color],
          "relative z-10 mr-0 w-[calc(100%_+_1px)] rounded-r-none border-r-0 [&>span]:mr-2.5 hidden lg:flex"
        )}
      >
        <p className="flex-1 truncate font-semibold">{event.title}</p>
        <span>{event.time}</span>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={cn(baseClasses, colorClasses[event.color], "hidden lg:flex")}
    >
      <p className="flex-1 truncate font-semibold">{event.title}</p>
      <span>{event.time}</span>
    </div>
  );
};

export const EventDot = ({ color }: { color: CalendarEvent["color"] }) => {
  const dotColors = {
    green: "bg-event-green",
    red: "bg-event-red",
    blue: "bg-event-blue",
    purple: "bg-event-purple",
    yellow: "bg-event-yellow",
    gray: "bg-event-gray",
  };

  return <div className={cn("size-2 rounded-full lg:hidden", dotColors[color])} />;
};
