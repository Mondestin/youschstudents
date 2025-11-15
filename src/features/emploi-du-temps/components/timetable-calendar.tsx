'use client';

import { useState, useEffect } from 'react';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { MonthView } from '@/components/calendar/MonthView';
import { WeekView } from '@/components/calendar/WeekView';
import { DayView } from '@/components/calendar/DayView';
import { useCalendar } from '@/hooks/useCalendar';
import { generateSampleEvents } from '@/data/generateSampleEvents';
import { CalendarEvent } from '@/types/calendar';
import SubjectDetailsModal from './subject-details-modal';

export default function TimetableCalendar() {
  const [sampleEvents, setSampleEvents] = useState<CalendarEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAttendanceUpdate = (eventId: string, status: CalendarEvent['attendanceStatus']) => {
    setSampleEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, attendanceStatus: status } : event
      )
    );
    // Update selected event if it's the one being updated
    if (selectedEvent?.id === eventId) {
      setSelectedEvent({ ...selectedEvent, attendanceStatus: status });
    }
  };

  // Generate events only on client side after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setSampleEvents(generateSampleEvents());
  }, []);

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
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex w-full h-full [&>*]:w-full">
      <div className="h-full w-full flex flex-col lg:rounded-xl lg:border shadow-sm">
        <div className={view === 'week' || view === 'day' ? 'sticky top-0 z-20 bg-background' : ''}>
          <CalendarHeader
            currentDate={currentDate}
            dateRange={getDateRangeText()}
            eventCount={totalEvents}
            view={view}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onViewChange={setView}
          />
        </div>

        <div className={`flex-1 overflow-auto ${view === 'month' ? 'p-4 lg:p-6' : ''}`}>
          {view === 'month' && (
            <MonthView days={calendarDays} onEventClick={handleEventClick} />
          )}
          {view === 'week' && (
            <WeekView
              weekDays={weekDays}
              events={events}
              onEventClick={handleEventClick}
            />
          )}
          {view === 'day' && (
            <DayView
              date={currentDate}
              events={events}
              onEventClick={handleEventClick}
            />
          )}
        </div>
      </div>

      <SubjectDetailsModal
        event={selectedEvent}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAttendanceUpdate={handleAttendanceUpdate}
      />
    </div>
  );
}
