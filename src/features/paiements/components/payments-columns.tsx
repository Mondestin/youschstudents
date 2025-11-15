'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Payment } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IconDownload, IconEye } from '@tabler/icons-react';

const getStatusBadge = (status: Payment['status']) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-600">Payé</Badge>;
    case 'pending':
      return <Badge variant="secondary">En attente</Badge>;
    case 'overdue':
      return <Badge variant="destructive">En retard</Badge>;
  }
};

export const paymentsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('description')}</div>;
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return <div className="font-semibold">{amount.toLocaleString('fr-FR')} FCFA</div>;
    }
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
    accessorKey: 'dueDate',
    header: 'Date d\'échéance',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate'));
      return format(date, 'd MMM yyyy', { locale: fr });
    }
  },
  {
    accessorKey: 'paidDate',
    header: 'Date de paiement',
    cell: ({ row }) => {
      const paidDate = row.getValue('paidDate') as string | undefined;
      return paidDate ? format(new Date(paidDate), 'd MMM yyyy', { locale: fr }) : '-';
    }
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Méthode',
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as string | undefined;
      return <div>{method || '-'}</div>;
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex items-center gap-2">
          {payment.receiptUrl && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <IconDownload className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <IconEye className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];

