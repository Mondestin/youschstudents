'use client';

import { useMemo, useState } from 'react';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import { paymentsColumns } from './payments-columns';
import { Payment } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter payments based on search query and status filter
  const filteredPayments = useMemo(() => {
    let filtered = payments;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((payment) => {
        return (
          payment.description.toLowerCase().includes(query) ||
          payment.amount.toString().includes(query) ||
          payment.status.toLowerCase().includes(query) ||
          payment.paymentMethod?.toLowerCase().includes(query) ||
          payment.dueDate.includes(query) ||
          payment.paidDate?.includes(query)
        );
      });
    }

    return filtered;
  }, [payments, searchQuery, statusFilter]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <ReusableTableWrapper
      data={filteredPayments}
      totalItems={filteredPayments.length}
      columns={paymentsColumns}
      defaultPageSize={10}
      searchPlaceholder="Rechercher un paiement..."
      exportButtonText="Exporter les paiements"
      paginationText={{
        showing: 'Affichage',
        to: 'à',
        of: 'sur',
        results: 'résultats'
      }}
      onSearch={handleSearch}
      additionalFilters={
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="paid">Payé</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  );
}

