'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconClipboardCheck, IconUserCheck, IconUserX, IconClock } from '@tabler/icons-react';
import { AttendanceStats } from '../types';
import { cn } from '@/lib/utils';

interface AttendanceOverviewProps {
  stats: AttendanceStats;
}

export default function AttendanceOverview({ stats }: AttendanceOverviewProps) {
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceBadge = (rate: number) => {
    if (rate >= 90) return 'default';
    if (rate >= 75) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Overall Attendance Rate */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Taux de Présence</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className={cn("text-2xl font-bold", getAttendanceColor(stats.attendanceRate))}>
              {stats.attendanceRate.toFixed(1)}%
            </span>
            <IconClipboardCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="mt-1">
            <Badge variant={getAttendanceBadge(stats.attendanceRate)}>
              {stats.attendanceRate >= 90 ? 'Excellent' : stats.attendanceRate >= 75 ? 'Bon' : 'À améliorer'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Present Days */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Présences</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-green-600">
              {stats.presentDays}
            </span>
            <IconUserCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            sur {stats.totalDays} jours
          </p>
        </CardContent>
      </Card>

      {/* Absent Days */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Absences</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-red-600">
              {stats.absentDays}
            </span>
            <IconUserX className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.excusedDays > 0 && `${stats.excusedDays} justifiées`}
          </p>
        </CardContent>
      </Card>

      {/* Late Days */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Retards</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-yellow-600">
              {stats.lateDays}
            </span>
            <IconClock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Retards enregistrés
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

