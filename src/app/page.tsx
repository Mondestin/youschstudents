import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to dashboard overview
  redirect('/dashboard/overview');
}
