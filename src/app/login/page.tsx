import { Metadata } from 'next';
import LoginPage from '@/features/auth/components/login-page';

export const metadata: Metadata = {
  title: 'Login | Yousch Students',
  description: 'Login to your student account'
};

export default async function Page() {
  return <LoginPage />;
}

