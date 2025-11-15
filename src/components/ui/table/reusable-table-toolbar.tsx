'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconSearch, IconDownload } from '@tabler/icons-react';
import type { Table } from '@tanstack/react-table';
import { useState } from 'react';

interface ReusableTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  exportButtonText?: string;
  exportButtonColor?: string;
  onSearch?: (value: string) => void;
  onExport?: () => void;
  additionalFilters?: React.ReactNode;
}

export function ReusableTableToolbar<TData>({
  table,
  searchPlaceholder = 'Rechercher...',
  exportButtonText = 'Exporter ce tableau',
  exportButtonColor,
  onSearch,
  onExport,
  additionalFilters
}: ReusableTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
    // Default search behavior can be added here
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Exporting table...');
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='relative max-w-sm flex-1'>
        <IconSearch className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className='pl-8'
        />
      </div>
      {additionalFilters && (
        <div className='flex items-center gap-2'>
          {additionalFilters}
        </div>
      )}
      <div className='flex gap-2 ml-auto'>
        <Button
          onClick={handleExport}
          className='text-white mr-4 transition-colors'
          style={{
            backgroundColor: exportButtonColor || 'var(--primary-light)'
          }}
          onMouseEnter={(e) => {
            // Use darker primary color on hover for better contrast
            e.currentTarget.style.backgroundColor = exportButtonColor || 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            // Return to lighter primary color
            e.currentTarget.style.backgroundColor = exportButtonColor || 'var(--primary-light)';
          }}
        >
          <IconDownload className='h-4 w-4 mr-2' />
          {exportButtonText}
        </Button>
      </div>
    </div>
  );
}

