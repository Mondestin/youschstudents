export type ViewType = 'day' | 'week' | 'month';

export type EventColor = 'green' | 'red' | 'blue' | 'purple' | 'yellow' | 'gray';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  time?: string; // Display time (e.g., "11:15 AM")
  color: EventColor;
  spanDays?: boolean; // For multi-day events
  description?: string;
  teacher?: string;
  location?: string;
  attendanceStatus?: 'present' | 'absent' | 'late' | 'excused' | 'not_signed';
}

export interface DayData {
  date: string; // Day number as string
  fullDate?: Date; // Full date object
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

export interface TimeSlot {
  hour: number;
  label: string;
}

