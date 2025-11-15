import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to timetable (emploi du temps)
  redirect('/dashboard/etudiants/emploi-du-temps');
}
