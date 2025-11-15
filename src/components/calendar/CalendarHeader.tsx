'use client';

import { Button } from '@/components/ui/button';
import { IconChevronLeft, IconChevronRight, IconPlus, IconList, IconLayoutColumns, IconApps } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ViewType } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  currentDate: Date;
  dateRange: string;
  eventCount: number;
  view: ViewType;
  onPrevious: () => void;
  onNext: () => void;
  onAddEvent?: () => void;
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
          <p className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground">
            {format(displayDate, 'MMM', { locale: fr }).toUpperCase()}
          </p>
          <p className="flex w-full items-center justify-center text-lg font-bold">
            {format(displayDate, 'd')}
          </p>
        </button>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {format(displayDate, 'MMMM yyyy', { locale: fr })}
            </span>
            <Badge variant="outline" className="whitespace-nowrap rounded-md border border-border px-1.5 py-0.5 text-xs font-medium bg-background text-muted-foreground">
              {eventCount} cours
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6.5 w-6.5"
              onClick={onPrevious}
            >
              <IconChevronLeft className="size-4.5" />
            </Button>
            <p className="text-sm text-muted-foreground">{dateRange}</p>
            <Button
              variant="outline"
              size="icon"
              className="h-6.5 w-6.5"
              onClick={onNext}
            >
              <IconChevronRight className="size-4.5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex">
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('day')}
            className={cn(
              'first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none',
              view === 'day' && 'bg-primary text-primary-foreground'
            )}
          >
            <IconList className="size-5" />
            <span className="hidden xl:block">Jour</span>
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('week')}
            className={cn(
              'hidden md:flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none -ml-px',
              view === 'week' && 'bg-primary text-primary-foreground'
            )}
          >
            <IconLayoutColumns className="size-5" />
            <span className="hidden xl:block">Semaine</span>
          </Button>
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('month')}
            className={cn(
              'first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none -ml-px',
              view === 'month' && 'bg-primary text-primary-foreground'
            )}
          >
            <IconApps className="size-5" />
            <span className="hidden xl:block">Mois</span>
          </Button>
        </div>
        {onAddEvent && (
          <Button onClick={onAddEvent} size="sm">
            <IconPlus className="size-4" />
            <span className="hidden xl:block">Ajouter un cours</span>
          </Button>
        )}
      </div>
    </div>
  );
};

