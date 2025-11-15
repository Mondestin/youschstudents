import { Metadata } from 'next';
import LoginPage from '@/features/auth/components/login-page';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  return <LoginPage />;
}
