'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface GradeStats {
  gpa: number;
  average: number;
  rank: number;
  totalStudents: number;
  improvement: number;
}

interface NotesOverviewProps {
  stats: GradeStats;
}

export default function NotesOverview({ stats }: NotesOverviewProps) {
  const rankPercentage = ((stats.totalStudents - stats.rank + 1) / stats.totalStudents) * 100;
  const isImproving = stats.improvement > 0;

  // Get mention based on GPA
  const getMention = (gpa: number): string => {
    if (gpa >= 16) return 'Très bien';
    if (gpa >= 14) return 'Bien';
    if (gpa >= 12) return 'Passable';
    return 'En-dessous';
  };

  const mention = getMention(stats.gpa);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* GPA Card */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Moyenne Générale (GPA)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{stats.gpa.toFixed(2)} / 20</span>
            {isImproving ? (
              <IconTrendingUp className="h-8 w-8 text-muted-foreground" />
            ) : (
              <IconTrendingDown className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isImproving ? '+' : ''}{stats.improvement.toFixed(1)}% vs trimestre précédent
          </p>
        </CardContent>
      </Card>

      {/* Average Card */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Moyenne de Classe</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{stats.average.toFixed(2)} / 20</span>
            {isImproving ? (
              <IconTrendingUp className="h-8 w-8 text-muted-foreground" />
            ) : (
              <IconTrendingDown className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="mt-1">
            <Badge variant={stats.gpa >= 12 ? 'default' : 'secondary'}>
              {mention}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Rank Card */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Classement</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              {stats.rank}<span className="text-lg text-muted-foreground">/{stats.totalStudents}</span>
            </span>
            {isImproving ? (
              <IconTrendingUp className="h-8 w-8 text-muted-foreground" />
            ) : (
              <IconTrendingDown className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Percentile: {rankPercentage.toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      {/* Improvement Card */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Évolution</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-3">
          <div className="flex items-baseline justify-between">
            <span className={cn(
              "text-2xl font-bold",
              isImproving ? "text-green-600" : "text-red-600"
            )}>
              {isImproving ? '+' : ''}{stats.improvement.toFixed(1)}%
            </span>
            {isImproving ? (
              <IconTrendingUp className="h-8 w-8 text-muted-foreground" />
            ) : (
              <IconTrendingDown className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isImproving ? 'Amélioration' : 'Baisse'} vs trimestre précédent
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

