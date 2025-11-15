'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useDataTable } from '@/hooks/use-data-table';
import { ReusableDataTable } from './reusable-data-table';
import { ReusableTableToolbar } from './reusable-table-toolbar';

interface ReusableTableWrapperProps<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  defaultPageSize?: number;
  showAlternatingRows?: boolean;
  searchPlaceholder?: string;
  exportButtonText?: string;
  exportButtonColor?: string;
  paginationText?: {
    showing?: string;
    to?: string;
    of?: string;
    results?: string;
  };
  onSearch?: (value: string) => void;
  onExport?: () => void;
  additionalFilters?: React.ReactNode;
  containerClassName?: string;
  tableContainerClassName?: string;
}

export function ReusableTableWrapper<TData, TValue>({
  data,
  totalItems,
  columns,
  defaultPageSize = 50,
  showAlternatingRows = true,
  searchPlaceholder = 'Rechercher...',
  exportButtonText = 'Exporter ce tableau',
  exportButtonColor,
  paginationText,
  onSearch,
  onExport,
  additionalFilters,
  containerClassName = 'rounded-lg border shadow-sm',
  tableContainerClassName = 'bg-white rounded-lg border-t-2'
}: ReusableTableWrapperProps<TData, TValue>) {
  const [pageSize] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(defaultPageSize)
  );
  const [page] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const pageCount = Math.ceil(totalItems / pageSize);

  // Manually paginate the data for client-side pagination
  const paginatedData = React.useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, page, pageSize]);

  const { table } = useDataTable({
    data: paginatedData,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500
  });

  return (
    <div className={containerClassName}>
      <div className='space-y-4 p-4'>
        <ReusableTableToolbar
          table={table}
          searchPlaceholder={searchPlaceholder}
          exportButtonText={exportButtonText}
          exportButtonColor={exportButtonColor}
          onSearch={onSearch}
          onExport={onExport}
          additionalFilters={additionalFilters}
        />
        <div
          className={tableContainerClassName}
          style={{
            borderTopColor: exportButtonColor || 'var(--primary-light)',
            borderTopWidth: '2px'
          }}
        >
          <ReusableDataTable
            table={table}
            showAlternatingRows={showAlternatingRows}
            totalItems={totalItems}
            paginationText={paginationText}
          />
        </div>
      </div>
    </div>
  );
}

