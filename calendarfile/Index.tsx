import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { MonthView } from "@/components/calendar/MonthView";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { useCalendar } from "@/hooks/useCalendar";
import { generateSampleEvents } from "@/data/generateSampleEvents";
import { toast } from "sonner";
import { useMemo } from "react";

const Index = () => {
  const sampleEvents = useMemo(() => generateSampleEvents(), []);
  
  const {
    currentDate,
    view,
    setView,
    calendarDays,
    weekDays,
    getEventsForDate,
    goToPrevious,
    goToNext,
    getDateRangeText,
    events,
  } = useCalendar(sampleEvents);

  const totalEvents = events.length;

  const handleEventClick = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    
    if (event) {
      toast.info(`Event: ${event.title}`, {
        description: `Time: ${event.time}`,
      });
    }
  };

  const handleAddEvent = () => {
    toast.success("Add Event", {
      description: "Event creation dialog would open here",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-8xl flex-1 p-4 lg:px-8">
      <div className="h-fit w-full lg:rounded-xl lg:border">
        <CalendarHeader
          currentDate={currentDate}
          dateRange={getDateRangeText()}
          eventCount={totalEvents}
          view={view}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onAddEvent={handleAddEvent}
          onViewChange={setView}
        />
        
        <div className="min-h-[600px]">
          {view === "month" && (
            <MonthView days={calendarDays} onEventClick={handleEventClick} />
          )}
          {view === "week" && (
            <WeekView 
              weekDays={weekDays} 
              events={events} 
              onEventClick={handleEventClick} 
            />
          )}
          {view === "day" && (
            <DayView 
              date={currentDate} 
              events={events} 
              onEventClick={handleEventClick} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
