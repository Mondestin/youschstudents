'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Grade } from '../types';
import { cn } from '@/lib/utils';

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

export const gradesColumns: ColumnDef<Grade>[] = [
  {
    accessorKey: 'subject',
    header: 'Matière',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('subject')}</div>;
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'grade',
    header: 'Note',
    cell: ({ row }) => {
      const grade = row.original;
      const percentage = (grade.grade / grade.maxGrade) * 100;
      return (
        <div className="flex items-center gap-2">
          <span className={cn("font-bold", getGradeColor(grade.grade, grade.maxGrade))}>
            {grade.grade.toFixed(2)} / {grade.maxGrade}
          </span>
          <Badge variant={getGradeBadgeVariant(grade.grade, grade.maxGrade)}>
            {percentage.toFixed(0)}%
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'coefficient',
    header: 'Coefficient',
    cell: ({ row }) => {
      return <div>{row.getValue('coefficient')}</div>;
    }
  },
  {
    accessorKey: 'semester',
    header: 'Trimestre',
    cell: ({ row }) => {
      return <div>{row.getValue('semester')}</div>;
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      if (value === 'all') return true;
      return row.getValue(id) === value;
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{date.toLocaleDateString('fr-FR')}</div>;
    }
  },
  {
    accessorKey: 'teacher',
    header: 'Enseignant',
    cell: ({ row }) => {
      return <div>{row.getValue('teacher')}</div>;
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'comment',
    header: 'Commentaire',
    cell: ({ row }) => {
      const comment = row.getValue('comment') as string | undefined;
      return (
        <div className="text-sm text-muted-foreground">
          {comment || '-'}
        </div>
      );
    }
  }
];

