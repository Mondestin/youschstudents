'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IconHome, IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import Image from 'next/image';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='flex w-full max-w-2xl flex-col items-center justify-center space-y-8 text-center'>
        {/* Logo */}
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative h-32 w-32'>
            <Image
              src='/logo.png'
              alt='Yousch Logo'
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>

        {/* 404 Content */}
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex items-center gap-4'>
            <IconAlertCircle className='h-16 w-16 text-primary' />
            <span className='text-9xl font-extrabold text-primary'>404</span>
          </div>
          
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Page introuvable</h1>
            <p className='text-muted-foreground text-lg'>
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          <div className='flex gap-4 pt-4'>
            <Button
              onClick={() => router.back()}
              variant='outline'
              size='lg'
              className='gap-2'
            >
              <IconArrowLeft className='h-4 w-4' />
              Retour
            </Button>
            <Button
              onClick={() => router.push('/dashboard/etudiants/emploi-du-temps')}
              size='lg'
              className='gap-2'
            >
              <IconHome className='h-4 w-4' />
              Accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
