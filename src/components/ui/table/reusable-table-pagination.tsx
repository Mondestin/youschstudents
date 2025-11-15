'use client';

import type { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ReusableTablePaginationProps<TData> {
  table: Table<TData>;
  totalItems?: number;
  paginationText?: {
    showing?: string;
    to?: string;
    of?: string;
    results?: string;
  };
}

export function ReusableTablePagination<TData>({
  table,
  totalItems,
  paginationText = {
    showing: 'Montrant',
    to: 'à',
    of: 'sur',
    results: 'résultats'
  }
}: ReusableTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = totalItems ?? table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className='flex items-center justify-between mt-4'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm text-muted-foreground'>
          {paginationText.showing} <span className='font-medium'>{startRow}</span>{' '}
          {paginationText.to} <span className='font-medium'>{endRow}</span>{' '}
          {paginationText.of} <span className='font-medium'>{totalRows}</span>{' '}
          {paginationText.results}
        </p>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='25'>25</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className='h-9 w-9 mr-4'
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='h-9 w-9 mr-4'
        >
          <IconChevronLeft className='h-4 w-4' />
        </Button>
        <span className='text-sm'>
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='h-9 w-9 mr-4'
        >
          <IconChevronRight className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className='h-9 w-9 mr-4'
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

