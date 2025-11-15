import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, List, Columns2, Grid3x3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ViewType } from "@/types/calendar";

interface CalendarHeaderProps {
  currentDate: Date;
  dateRange: string;
  eventCount: number;
  view: ViewType;
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent: () => void;
  onViewChange: (view: ViewType) => void;
}

export const CalendarHeader = ({
  currentDate,
  dateRange,
  eventCount,
  view,
  onPrevious,
  onNext,
  onAddEvent,
  onViewChange,
}: CalendarHeaderProps) => {
  const today = new Date();
  const displayDate = currentDate || today;

  return (
    <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button className="flex size-14 flex-col items-start overflow-hidden rounded-lg border">
          <p className="flex h-6 w-full items-center justify-center bg-bg-primary text-center text-xs font-semibold text-primary-foreground">
            {format(displayDate, "MMM").toUpperCase()}.
          </p>
          <p className="flex w-full items-center justify-center text-lg font-bold">
            {format(displayDate, "d")}
          </p>
        </button>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{format(displayDate, "MMMM yyyy")}</span>
            <Badge
              variant="outline"
              className="whitespace-nowrap rounded-md border-b-primary bg-bg-primary text-xs font-medium text-t-primary"
            >
              {eventCount} events
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-6.5 px-0 [&_svg]:size-4.5"
              onClick={onPrevious}
            >
              <ChevronLeft />
            </Button>
            <p className="text-sm text-t-tertiary">{dateRange}</p>
            <Button
              variant="outline"
              size="icon"
              className="size-6.5 px-0 [&_svg]:size-4.5"
              onClick={onNext}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex">
          <Button
            variant={view === "day" ? "default" : "outline"}
            onClick={() => onViewChange("day")}
            className="first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none"
          >
            <List />
            <span className="hidden xl:block">Day</span>
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => onViewChange("week")}
            className="hidden md:flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none -ml-px"
          >
            <Columns2 />
            <span className="hidden xl:block">Week</span>
          </Button>
          <Button
            variant={view === "month" ? "default" : "outline"}
            onClick={() => onViewChange("month")}
            className="first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none -ml-px"
          >
            <Grid3x3 />
            <span className="hidden xl:block">Month</span>
          </Button>
        </div>
        <Button onClick={onAddEvent} className="bg-bg-primary hover:bg-bg-primary-hover">
          <Plus />
          Add Event
        </Button>
      </div>
    </div>
  );
};
