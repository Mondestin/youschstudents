'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { AttendanceRecord } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-green-600">Présent</Badge>;
    case 'absent':
      return <Badge variant="destructive">Absent</Badge>;
    case 'late':
      return <Badge variant="secondary">Retard</Badge>;
    case 'excused':
      return <Badge className="bg-blue-600">Justifié</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export const attendanceColumns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return format(date, 'd MMM yyyy', { locale: fr });
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'subject',
    header: 'Matière',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('subject')}</div>;
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      return getStatusBadge(row.getValue('status'));
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      if (value === 'all') return true;
      return row.getValue(id) === value;
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
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      const notes = row.getValue('notes') as string | undefined;
      return (
        <div className="text-sm text-muted-foreground">
          {notes || '-'}
        </div>
      );
    }
  }
];

