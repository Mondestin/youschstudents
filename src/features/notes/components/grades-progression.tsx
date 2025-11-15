'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Grade } from '../types';
import { cn } from '@/lib/utils';
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react';

interface GradesProgressionProps {
  grades: Grade[];
}

export default function GradesProgression({ grades }: GradesProgressionProps) {
  // Group grades by semester and subject
  const progressionData = useMemo(() => {
    const semesters = Array.from(new Set(grades.map(g => g.semester))).sort();
    const subjects = Array.from(new Set(grades.map(g => g.subject))).sort();
    
    const data: Record<string, Record<string, { grade: number; maxGrade: number; coefficient: number; date: string }[]>> = {};
    
    semesters.forEach(semester => {
      data[semester] = {};
      subjects.forEach(subject => {
        data[semester][subject] = grades.filter(g => g.semester === semester && g.subject === subject);
      });
    });
    
    return { semesters, subjects, data };
  }, [grades]);

  // Calculate average for each subject in each semester
  const calculateAverage = (subjectGrades: { grade: number; coefficient: number }[]) => {
    if (subjectGrades.length === 0) return null;
    const totalPoints = subjectGrades.reduce((sum, g) => sum + (g.grade * g.coefficient), 0);
    const totalCoeff = subjectGrades.reduce((sum, g) => sum + g.coefficient, 0);
    return totalCoeff > 0 ? totalPoints / totalCoeff : 0;
  };

  // Calculate trend between two averages
  const getTrend = (current: number | null, previous: number | null) => {
    if (!current || !previous) return null;
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Évolution des notes par trimestre</CardTitle>
          <CardDescription>
            Graphique montrant votre progression au fil du temps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Matière</th>
                  {progressionData.semesters.map(semester => (
                    <th key={semester} className="text-center p-3 font-medium min-w-[120px]">
                      {semester}
                    </th>
                  ))}
                  <th className="text-center p-3 font-medium">Évolution</th>
                </tr>
              </thead>
              <tbody>
                {progressionData.subjects.map(subject => {
                  const averages = progressionData.semesters.map(semester => {
                    const subjectGrades = progressionData.data[semester][subject] || [];
                    return calculateAverage(subjectGrades.map(g => ({ grade: g.grade, coefficient: g.coefficient })));
                  });
                  
                  const firstAvg = averages[0];
                  const lastAvg = averages[averages.length - 1];
                  const trend = getTrend(lastAvg, firstAvg);
                  
                  return (
                    <tr key={subject} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{subject}</td>
                      {averages.map((avg, idx) => (
                        <td key={idx} className="text-center p-3">
                          {avg !== null ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className={cn(
                                "font-bold text-lg",
                                avg >= 16 ? "text-green-600" : avg >= 14 ? "text-blue-600" : avg >= 12 ? "text-yellow-600" : "text-red-600"
                              )}>
                                {avg.toFixed(2)}
                              </span>
                              <Badge variant={avg >= 12 ? 'default' : 'secondary'} className="text-xs">
                                / 20
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                      <td className="text-center p-3">
                        {trend && firstAvg && lastAvg && (
                          <div className="flex items-center justify-center gap-1">
                            {trend === 'up' && (
                              <>
                                <IconTrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600 font-medium">
                                  +{(lastAvg - firstAvg).toFixed(2)}
                                </span>
                              </>
                            )}
                            {trend === 'down' && (
                              <>
                                <IconTrendingDown className="h-4 w-4 text-red-600" />
                                <span className="text-sm text-red-600 font-medium">
                                  {(lastAvg - firstAvg).toFixed(2)}
                                </span>
                              </>
                            )}
                            {trend === 'stable' && (
                              <>
                                <IconMinus className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Stable
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

