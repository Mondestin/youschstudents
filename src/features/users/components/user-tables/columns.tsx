'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/features/users/types';
import { ColumnDef } from '@tanstack/react-table';
import { IconTrash } from '@tabler/icons-react';
import { CheckCircle2 } from 'lucide-react';

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Status badge component
const StatusBadge = ({ status }: { status: User['status'] }) => {
  if (status === 'active') {
    return (
      <Badge className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700 hover:bg-green-200 shadow gap-1'>
        <CheckCircle2 className='w-3 h-3' />
        <span>Actif</span>
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200 shadow gap-1'>
      <span>Inactif</span>
    </Badge>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      const name = row.original.name;
      const initials = getInitials(name);
      return (
        <span className='relative flex shrink-0 overflow-hidden rounded-full h-8 w-8'>
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
            {initials}
          </span>
        </span>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ cell }) => <div>{cell.getValue<User['name']>()}</div>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ cell }) => <div>{cell.getValue<User['email']>()}</div>
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ cell }) => <div>{cell.getValue<User['phone']>()}</div>
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ cell }) => {
      const status = cell.getValue<User['status']>();
      return <StatusBadge status={status} />;
    }
  },
  {
    accessorKey: 'registrationDate',
    header: 'Date d\'inscription',
    cell: ({ cell }) => <div>{cell.getValue<User['registrationDate']>()}</div>
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const handleDelete = () => {
        // Delete logic can be added here
        console.log('Deleting user:', row.original.id);
      };

      return (
        <Button
          variant='ghost'
          size='sm'
          onClick={handleDelete}
          className='h-9 w-9 hover:bg-destructive/10 hover:text-destructive'
        >
          <IconTrash className='h-4 w-4' />
          <span className='sr-only'>Delete</span>
        </Button>
      );
    }
  }
];

