'use client';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push('/login');
  };

  return (
    <header className='z-50 h-16 shadow-none'>
      <div className='relative flex h-full items-center gap-3 p-4 sm:gap-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='h-6' />
        <div className='ms-auto flex items-center space-x-4'>
          <Button variant='ghost' onClick={handleLogout} className='gap-2'>
            <IconLogout className='h-4 w-4' />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
