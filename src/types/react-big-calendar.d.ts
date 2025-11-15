declare module 'react-big-calendar' {
  import { ComponentType, CSSProperties } from 'react';

  export type View = 'month' | 'week' | 'day' | 'agenda';
  export type Navigate = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';

  export interface Event {
    title?: string;
    start?: Date;
    end?: Date;
    resource?: any;
    allDay?: boolean;
    [key: string]: any;
  }

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor: string | ((event: Event) => Date);
    endAccessor: string | ((event: Event) => Date);
    defaultDate?: Date;
    defaultView?: View;
    date?: Date;
    view?: View;
    onView?: (view: View) => void;
    onNavigate?: (date: Date, view: View, action: Navigate) => void;
    onSelectEvent?: (event: Event) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date; slots: Date[] }) => void;
    formats?: any;
    messages?: any;
    culture?: string;
    className?: string;
    style?: CSSProperties;
    eventPropGetter?: (event: Event, start: Date, end: Date, isSelected: boolean) => { className?: string; style?: CSSProperties };
    components?: {
      event?: ComponentType<{ event: Event }>;
      eventWrapper?: ComponentType<any>;
      day?: ComponentType<any>;
      week?: ComponentType<any>;
      month?: ComponentType<any>;
      agenda?: ComponentType<any>;
      toolbar?: ComponentType<any>;
      header?: ComponentType<any>;
    };
    [key: string]: any;
  }

  export class Calendar extends ComponentType<CalendarProps> {}

  export interface Localizer {
    format(date: Date, format: string, culture?: string): string;
    parse(dateString: string, format: string, culture?: string): Date;
    startOfWeek(date: Date, culture?: string): Date;
    endOfWeek(date: Date, culture?: string): Date;
    startOfDay(date: Date): Date;
    endOfDay(date: Date): Date;
    addDays(date: Date, days: number): Date;
    addWeeks(date: Date, weeks: number): Date;
    addMonths(date: Date, months: number): Date;
    startOfMonth(date: Date): Date;
    endOfMonth(date: Date): Date;
    startOfWeek(date: Date): Date;
    endOfWeek(date: Date): Date;
    getDay(date: Date): number;
    getSlotMinutes(date: Date): number;
    getDstOffset(date: Date, date2: Date): number;
    getTimezoneOffset(date: Date): number;
    getTimezone(date: Date): string;
    getCulture(date: Date): string;
    sameDay(date1: Date, date2: Date): boolean;
    sameMonth(date1: Date, date2: Date): boolean;
    sameWeek(date1: Date, date2: Date): boolean;
    diff(date1: Date, date2: Date, unit: string): number;
    firstVisibleDay(date: Date, culture?: string): Date;
    lastVisibleDay(date: Date, culture?: string): Date;
    visibleDays(date: Date, culture?: string): Date[];
    merge(date: Date, time: Date): Date;
    inRange(date: Date, start: Date, end: Date): boolean;
    isSameDate(date1: Date, date2: Date): boolean;
    isBefore(date1: Date, date2: Date): boolean;
    isAfter(date1: Date, date2: Date): boolean;
    isEqual(date1: Date, date2: Date): boolean;
    min(date1: Date, date2: Date): Date;
    max(date1: Date, date2: Date): Date;
    ceil(date: Date, unit: string): Date;
    floor(date: Date, unit: string): Date;
  }

  export function dateFnsLocalizer(config: {
    format: (date: Date, format: string, options?: any) => string;
    parse: (dateString: string, format: string, options?: any) => Date;
    startOfWeek: (date: Date, options?: any) => Date;
    getDay: (date: Date) => number;
    locales?: any;
  }): Localizer;
}

