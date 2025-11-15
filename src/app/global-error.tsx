'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';
import { IconHome, IconRefresh, IconAlertTriangle } from '@tabler/icons-react';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center p-4 bg-background'>
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

            {/* Error Content */}
            <div className='flex flex-col items-center space-y-6'>
              <div className='flex items-center gap-4'>
                <IconAlertTriangle className='h-16 w-16 text-primary' />
                <span className='text-9xl font-extrabold text-primary'>500</span>
              </div>
              
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold'>Erreur critique</h1>
                <p className='text-muted-foreground text-lg'>
                  Une erreur critique s'est produite. Notre équipe a été notifiée et travaille à résoudre le problème.
                </p>
              </div>

              <div className='flex gap-4 pt-4'>
                <Button
                  onClick={reset}
                  variant='outline'
                  size='lg'
                  className='gap-2'
                >
                  <IconRefresh className='h-4 w-4' />
                  Réessayer
                </Button>
                <Button
                  onClick={() => window.location.href = '/dashboard/etudiants/emploi-du-temps'}
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
      </body>
    </html>
  );
}
