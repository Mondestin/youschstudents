'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Image from 'next/image';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'L\'email est requis' })
    .email({ message: 'Veuillez entrer une adresse email valide' }),
  password: z
    .string()
    .min(1, { message: 'Le mot de passe est requis' })
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement your authentication logic here
      console.log('Login:', data);
      toast.success('Connexion réussie!');
      router.push('/dashboard/etudiants/emploi-du-temps');
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        {/* Logo */}
        <div className='flex flex-col items-center m-0 p-0'>
          <div className='relative h-30 w-60 m-0 p-0'>
            <Image
              src='/logo.png'
              alt='Yousch Logo'
              fill
              className='object-contain'
              priority
            />
          </div>
          <p className='text-muted-foreground text-sm'>Portail étudiant</p>
        </div>

        {/* Login Form */}
        <div className='w-full space-y-6 rounded-lg border bg-card p-8 shadow-sm'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>Connexion</h2>
            <p className='text-muted-foreground mt-2 text-sm'>
              Connectez-vous à votre compte étudiant
            </p>
          </div>

          <Form form={form as any} onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='nom@exemple.com'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Entrez votre mot de passe'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

