import PageContainer from '@/components/layout/page-container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Étudiants'
};

export default async function EtudiantsPage() {
  const menuItems = [
    {
      title: 'Emploi du temps',
      description: 'Consulter et gérer les horaires des cours',
      url: '/dashboard/etudiants/emploi-du-temps',
      icon: Icons.calendar
    },
    {
      title: 'Notes',
      description: 'Voir et gérer les notes des étudiants',
      url: '/dashboard/etudiants/notes',
      icon: Icons.school
    },
    {
      title: 'Rapport de paiements',
      description: 'Consulter les rapports de paiements',
      url: '/dashboard/etudiants/rapport-paiements',
      icon: Icons.reportMoney
    },
    {
      title: 'Assiduités',
      description: 'Gérer et consulter l'assiduité des étudiants',
      url: '/dashboard/etudiants/presence',
      icon: Icons.clipboardCheck
    }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Étudiants</h1>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <Icon className='h-5 w-5' />
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href={item.url}>Accéder</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}

