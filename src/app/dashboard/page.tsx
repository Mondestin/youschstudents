import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Redirect to student timetable
  redirect('/dashboard/etudiants/emploi-du-temps');
}
