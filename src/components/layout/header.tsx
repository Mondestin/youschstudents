'use client';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';

export default function Header() {
  return (
    <header className='z-50 h-16 shadow-none'>
      <div className='relative flex h-full items-center gap-3 p-4 sm:gap-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='h-6' />
        <div className='ms-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
