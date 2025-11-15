'use client';

import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import type * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ReusableTablePagination } from './reusable-table-pagination';

interface ReusableDataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  showAlternatingRows?: boolean;
  totalItems?: number;
  paginationText?: {
    showing?: string;
    to?: string;
    of?: string;
    results?: string;
  };
}

export function ReusableDataTable<TData>({
  table,
  showAlternatingRows = true,
  totalItems,
  paginationText = {
    showing: 'Montrant',
    to: 'à',
    of: 'sur',
    results: 'résultats'
  }
}: ReusableDataTableProps<TData>) {
  return (
    <>
      <div className='relative w-full overflow-auto'>
        <Table className='w-full caption-bottom text-sm border rounded-lg border-separate border-spacing-0'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-b'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='h-10 px-2 text-left align-middle font-medium text-muted-foreground rounded-lg'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    showAlternatingRows
                      ? index % 2 === 0
                        ? 'bg-white'
                        : 'bg-muted/50'
                      : ''
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-2 align-middle'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ReusableTablePagination table={table} totalItems={totalItems} paginationText={paginationText} />
    </>
  );
}

