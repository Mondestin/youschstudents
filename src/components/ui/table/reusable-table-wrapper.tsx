'use client';

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
  exportButtonColor = '#01631b',
  paginationText,
  onSearch,
  onExport,
  containerClassName = 'rounded-lg border shadow-sm',
  tableContainerClassName = 'bg-white rounded-lg border-t-2'
}: ReusableTableWrapperProps<TData, TValue>) {
  const [pageSize] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(defaultPageSize)
  );

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
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
        />
        <div
          className={tableContainerClassName}
          style={
            exportButtonColor
              ? { borderTopColor: exportButtonColor, borderTopWidth: '2px' }
              : undefined
          }
        >
          <ReusableDataTable
            table={table}
            showAlternatingRows={showAlternatingRows}
            paginationText={paginationText}
          />
        </div>
      </div>
    </div>
  );
}

