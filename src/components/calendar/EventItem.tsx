'use client';

import { CalendarEvent } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface EventItemProps {
  event: CalendarEvent;
  onClick?: () => void;
}

const colorClasses = {
  green: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  red: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
  blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  purple: 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300',
  yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  gray: 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
};

export const EventItem = ({ event, onClick }: EventItemProps) => {
  const baseClasses =
    'mx-1 size-auto h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs cursor-pointer';

  if (event.spanDays) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={cn(
          baseClasses,
          colorClasses[event.color],
          'relative z-10 mr-0 w-[calc(100%_+_1px)] rounded-r-none border-r-0 [&>span]:mr-2.5 hidden lg:flex'
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
      className={cn(baseClasses, colorClasses[event.color], 'hidden lg:flex')}
    >
      <p className="flex-1 truncate font-semibold">{event.title}</p>
      <span>{event.time}</span>
    </div>
  );
};

export const EventDot = ({ color }: { color: CalendarEvent['color'] }) => {
  const dotColors = {
    green: 'bg-green-600',
    red: 'bg-red-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600',
  };

  return <div className={cn('size-2 rounded-full lg:hidden', dotColors[color])} />;
};

