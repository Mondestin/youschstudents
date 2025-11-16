'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { AttendanceRecord } from '../types';
import { cn } from '@/lib/utils';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const statusColors = {
  present: 'bg-green-100 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300',
  absent: 'bg-red-100 border-red-300 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300',
  late: 'bg-yellow-100 border-yellow-300 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300',
  excused: 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300'
};

const statusLabels = {
  present: 'Présent',
  absent: 'Absent',
  late: 'Retard',
  excused: 'Justifié'
};

export default function AttendanceCalendar({ records }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set date only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());
  }, []);

  const getRecordsForDate = (date: Date) => {
    return records.filter(record => isSameDay(new Date(record.date), date));
  };

  const handlePreviousMonth = () => {
    if (currentDate) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (currentDate) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !currentDate) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>Calendrier d'assiduité</CardTitle>
            <CardDescription>Vue mensuelle de votre assiduité</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Chargement...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = getDay(monthStart);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Calendrier de présence</CardTitle>
            <CardDescription>
              Vue mensuelle de votre présence
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[150px] text-center">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={cn('size-3 rounded border', statusColors[status as keyof typeof statusColors])} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week Days Header */}
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}

            {/* Days in month */}
            {daysInMonth.map((day) => {
              const dayRecords = getRecordsForDate(day);
              const uniqueStatuses = Array.from(new Set(dayRecords.map(r => r.status)));

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'p-2 border rounded-md min-h-[60px]',
                    dayRecords.length > 0 && 'border-2'
                  )}
                >
                  <div className="text-xs font-semibold mb-1">
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {uniqueStatuses.map((status) => {
                      const count = dayRecords.filter(r => r.status === status).length;
                      return (
                        <div
                          key={status}
                          className={cn(
                            'text-xs px-1 py-0.5 rounded border text-center',
                            statusColors[status as keyof typeof statusColors]
                          )}
                        >
                          {count > 1 && `${count}x `}
                          {statusLabels[status as keyof typeof statusLabels]}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

