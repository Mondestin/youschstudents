'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Grade } from '../types';
import { cn } from '@/lib/utils';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

interface GradesDetailsProps {
  grades: Grade[];
}

const getGradeColor = (grade: number, maxGrade: number) => {
  const percentage = (grade / maxGrade) * 100;
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const getGradeBadgeVariant = (grade: number, maxGrade: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const percentage = (grade / maxGrade) * 100;
  if (percentage >= 80) return 'default';
  if (percentage >= 60) return 'default';
  if (percentage >= 50) return 'secondary';
  return 'destructive';
};

const getTypeLabel = (type?: string) => {
  switch (type) {
    case 'exam':
      return 'Examens';
    case 'practical':
      return 'Travaux pratiques';
    case 'assignment':
      return 'Devoirs';
    default:
      return 'Autres';
  }
};

export default function GradesDetails({ grades }: GradesDetailsProps) {
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});

  // Group grades by subject
  const groupedBySubject = useMemo(() => {
    const grouped: Record<string, Grade[]> = {};
    grades.forEach(grade => {
      if (!grouped[grade.subject]) {
        grouped[grade.subject] = [];
      }
      grouped[grade.subject].push(grade);
    });
    return grouped;
  }, [grades]);

  // Group grades by type within each subject
  const groupedByType = useMemo(() => {
    const result: Record<string, Record<string, Grade[]>> = {};
    Object.keys(groupedBySubject).forEach(subject => {
      result[subject] = {
        exam: groupedBySubject[subject].filter(g => g.type === 'exam'),
        practical: groupedBySubject[subject].filter(g => g.type === 'practical'),
        assignment: groupedBySubject[subject].filter(g => g.type === 'assignment')
      };
    });
    return result;
  }, [groupedBySubject]);

  const toggleSubject = (subject: string) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  return (
    <div className="space-y-3">
      {Object.keys(groupedBySubject).sort().map(subject => {
        const isOpen = openSubjects[subject] ?? false;
        const subjectGrades = groupedBySubject[subject];
        const byType = groupedByType[subject];
        
        // Calculate subject average
        const totalPoints = subjectGrades.reduce((sum, g) => sum + (g.grade * g.coefficient), 0);
        const totalCoeff = subjectGrades.reduce((sum, g) => sum + g.coefficient, 0);
        const average = totalCoeff > 0 ? totalPoints / totalCoeff : 0;

        return (
          <Card key={subject} className="py-2 gap-2">
            <Collapsible open={isOpen} onOpenChange={() => toggleSubject(subject)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-2 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isOpen ? (
                        <IconChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <IconChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                      <CardTitle className="text-sm font-medium">{subject}</CardTitle>
                      <Badge variant="outline" className="ml-1 text-xs">
                        {average.toFixed(2)} / 20
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {subjectGrades.length} note{subjectGrades.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 px-4 pb-3">
                  <div className="space-y-4">
                    {/* Exams */}
                    {byType.exam.length > 0 && (
                      <div>
                        <h4 className="font-medium text-xs mb-2 text-muted-foreground">
                          {getTypeLabel('exam')}
                        </h4>
                        <div className="space-y-1.5">
                          {byType.exam.map(grade => (
                            <div
                              key={grade.id}
                              className="flex items-center justify-between p-2 rounded-md border bg-card"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={cn("font-semibold text-base", getGradeColor(grade.grade, grade.maxGrade))}>
                                    {grade.grade.toFixed(2)} / {grade.maxGrade}
                                  </span>
                                  <Badge variant={getGradeBadgeVariant(grade.grade, grade.maxGrade)} className="text-xs">
                                    {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Coef. {grade.coefficient}
                                  </span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <span>{new Date(grade.date).toLocaleDateString('fr-FR')}</span>
                                  <span>•</span>
                                  <span>{grade.teacher}</span>
                                  <span>•</span>
                                  <span>{grade.semester}</span>
                                </div>
                                {grade.comment && (
                                  <p className="text-xs text-muted-foreground mt-0.5 italic">
                                    {grade.comment}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practicals */}
                    {byType.practical.length > 0 && (
                      <div>
                        <h4 className="font-medium text-xs mb-2 text-muted-foreground">
                          {getTypeLabel('practical')}
                        </h4>
                        <div className="space-y-1.5">
                          {byType.practical.map(grade => (
                            <div
                              key={grade.id}
                              className="flex items-center justify-between p-2 rounded-md border bg-card"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={cn("font-semibold text-base", getGradeColor(grade.grade, grade.maxGrade))}>
                                    {grade.grade.toFixed(2)} / {grade.maxGrade}
                                  </span>
                                  <Badge variant={getGradeBadgeVariant(grade.grade, grade.maxGrade)} className="text-xs">
                                    {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Coef. {grade.coefficient}
                                  </span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <span>{new Date(grade.date).toLocaleDateString('fr-FR')}</span>
                                  <span>•</span>
                                  <span>{grade.teacher}</span>
                                  <span>•</span>
                                  <span>{grade.semester}</span>
                                </div>
                                {grade.comment && (
                                  <p className="text-xs text-muted-foreground mt-0.5 italic">
                                    {grade.comment}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assignments */}
                    {byType.assignment.length > 0 && (
                      <div>
                        <h4 className="font-medium text-xs mb-2 text-muted-foreground">
                          {getTypeLabel('assignment')}
                        </h4>
                        <div className="space-y-1.5">
                          {byType.assignment.map(grade => (
                            <div
                              key={grade.id}
                              className="flex items-center justify-between p-2 rounded-md border bg-card"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={cn("font-semibold text-base", getGradeColor(grade.grade, grade.maxGrade))}>
                                    {grade.grade.toFixed(2)} / {grade.maxGrade}
                                  </span>
                                  <Badge variant={getGradeBadgeVariant(grade.grade, grade.maxGrade)} className="text-xs">
                                    {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Coef. {grade.coefficient}
                                  </span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <span>{new Date(grade.date).toLocaleDateString('fr-FR')}</span>
                                  <span>•</span>
                                  <span>{grade.teacher}</span>
                                  <span>•</span>
                                  <span>{grade.semester}</span>
                                </div>
                                {grade.comment && (
                                  <p className="text-xs text-muted-foreground mt-0.5 italic">
                                    {grade.comment}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}

