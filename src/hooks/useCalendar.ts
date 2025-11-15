import { useState, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  format,
  isSameMonth,
  isSameDay,
  getDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ViewType } from '@/types/calendar';
import { CalendarEvent, DayData } from '@/types/calendar';

export function useCalendar(events: CalendarEvent[] = []) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  // Get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      if (!event.date) return false;
      return isSameDay(new Date(event.date), date);
    });
  };

  // Generate calendar days for month view
  const calendarDays: DayData[] = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((day) => ({
      date: format(day, 'd'),
      fullDate: day,
      isCurrentMonth: isSameMonth(day, currentDate),
      events: getEventsForDate(day)
    }));
  }, [currentDate, events]);

  // Generate week days for week view
  const weekDays: Date[] = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { locale: fr, weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [currentDate]);

  // Navigation functions
  const goToPrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const goToNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Get date range text based on view
  const getDateRangeText = (): string => {
    if (view === 'day') {
      return format(currentDate, 'd MMM yyyy', { locale: fr });
    } else if (view === 'week') {
      const weekStart = startOfWeek(currentDate, { locale: fr, weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { locale: fr, weekStartsOn: 1 });
      return `${format(weekStart, 'd MMM', { locale: fr })} - ${format(weekEnd, 'd MMM yyyy', { locale: fr })}`;
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      return `${format(monthStart, 'd MMM', { locale: fr })} - ${format(monthEnd, 'd MMM yyyy', { locale: fr })}`;
    }
  };

  return {
    currentDate,
    view,
    setView,
    calendarDays,
    weekDays,
    getEventsForDate,
    goToPrevious,
    goToNext,
    getDateRangeText,
    events
  };
}

