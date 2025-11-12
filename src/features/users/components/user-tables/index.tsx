'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';

interface UserTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}

export function UserTable<TData, TValue>({
  data,
  totalItems,
  columns
}: UserTableParams<TData, TValue>) {
  return (
    <ReusableTableWrapper
      data={data}
      totalItems={totalItems}
      columns={columns}
      defaultPageSize={50}
      searchPlaceholder='Rechercher un chauffeur...'
      exportButtonText='Exporter ce tableau'
      exportButtonColor='#01631b'
      paginationText={{
        showing: 'Montrant',
        to: 'à',
        of: 'sur',
        results: 'résultats'
      }}
    />
  );
}

