'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Payment } from '../types';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isToday, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface PaymentCalendarProps {
  payments: Payment[];
}

export default function PaymentCalendar({ payments }: PaymentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getPaymentsForDate = (date: Date) => {
    return payments.filter((payment) => {
      const dueDate = new Date(payment.dueDate);
      return isSameDay(dueDate, date);
    });
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusDotColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDateStatus = (date: Date) => {
    const dayPayments = getPaymentsForDate(date);
    if (dayPayments.length === 0) return null;
    
    // Get the most important status (overdue > pending > paid)
    if (dayPayments.some(p => p.status === 'overdue')) return 'overdue';
    if (dayPayments.some(p => p.status === 'pending')) return 'pending';
    return 'paid';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier des paiements</CardTitle>
        <CardDescription>
          Dates d'échéance de vos paiements à venir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Month Header with Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
              className="h-8 w-8"
            >
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                {format(currentDate, 'MMMM yyyy', { locale: fr })}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="h-7 text-xs"
              >
                Aujourd'hui
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
              className="h-8 w-8"
            >
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => {
              const dayPayments = getPaymentsForDate(day);
              const isCurrentMonth = day >= monthStart && day <= monthEnd;
              const isCurrentDay = isToday(day);
              const dateStatus = getDateStatus(day);

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'min-h-[80px] p-1 border rounded-md relative',
                    !isCurrentMonth && 'opacity-40',
                    isCurrentDay && 'ring-2 ring-primary'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className={cn(
                      'text-xs font-medium',
                      isCurrentDay && 'text-primary font-bold'
                    )}>
                      {format(day, 'd')}
                    </div>
                    {/* Status indicator dot */}
                    {dateStatus && (
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        getStatusDotColor(dateStatus)
                      )} />
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayPayments.slice(0, 2).map((payment) => (
                      <Badge
                        key={payment.id}
                        variant="outline"
                        className={cn(
                          'text-xs w-full justify-start truncate',
                          getStatusColor(payment.status)
                        )}
                      >
                        <span className="truncate">
                          {payment.amount.toLocaleString('fr-FR')} FCFA
                        </span>
                      </Badge>
                    ))}
                    {dayPayments.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayPayments.length - 2} autre(s)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
              <span className="text-xs text-muted-foreground">Payé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></div>
              <span className="text-xs text-muted-foreground">En attente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-100 border border-red-200"></div>
              <span className="text-xs text-muted-foreground">En retard</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

