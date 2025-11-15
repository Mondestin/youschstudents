'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IconHome, IconRefresh, IconAlertTriangle } from '@tabler/icons-react';
import Image from 'next/image';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

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

        {/* 500 Content */}
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex items-center gap-4'>
            <IconAlertTriangle className='h-16 w-16 text-primary' />
            <span className='text-9xl font-extrabold text-primary'>500</span>
          </div>
          
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Erreur serveur</h1>
            <p className='text-muted-foreground text-lg'>
              Une erreur inattendue s'est produite. Notre équipe a été notifiée et travaille à résoudre le problème.
            </p>
            {process.env.NODE_ENV === 'development' && error.message && (
              <p className='mt-4 rounded-md bg-destructive/10 p-4 text-left text-sm text-destructive'>
                <strong>Détails de l'erreur :</strong> {error.message}
              </p>
            )}
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

