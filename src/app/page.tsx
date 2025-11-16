import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to login page
  redirect('/login');
}
