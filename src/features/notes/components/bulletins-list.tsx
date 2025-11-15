'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconDownload, IconFileText } from '@tabler/icons-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Bulletin {
  id: string;
  semester: string;
  year: string;
  issueDate: string;
  average: number;
  rank: number;
  totalStudents: number;
  mention: string;
  downloadUrl?: string;
}

// Mock bulletins data
const mockBulletins: Bulletin[] = [
  {
    id: '1',
    semester: 'Trimestre 1',
    year: '2024-2025',
    issueDate: '2024-12-15',
    average: 15.5,
    rank: 12,
    totalStudents: 45,
    mention: 'Bien',
    downloadUrl: '/bulletins/bulletin-1.pdf'
  },
  {
    id: '2',
    semester: 'Trimestre 2',
    year: '2024-2025',
    issueDate: '2025-03-20',
    average: 16.2,
    rank: 8,
    totalStudents: 45,
    mention: 'Très bien',
    downloadUrl: '/bulletins/bulletin-2.pdf'
  },
  {
    id: '3',
    semester: 'Trimestre 1',
    year: '2023-2024',
    issueDate: '2023-12-10',
    average: 14.8,
    rank: 18,
    totalStudents: 42,
    mention: 'Bien',
    downloadUrl: '/bulletins/bulletin-3.pdf'
  }
];

const getMentionColor = (mention: string) => {
  switch (mention) {
    case 'Très bien':
      return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
    case 'Bien':
      return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800';
    case 'Assez bien':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800';
    case 'Passable':
      return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800';
  }
};

export default function BulletinsList() {
  const handleDownload = (url: string, semester: string) => {
    // TODO: Implement download functionality
    console.log('Downloading bulletin:', url, semester);
    // In a real app, this would trigger a download
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-2">
      {mockBulletins.length > 0 ? (
        mockBulletins.map((bulletin) => (
          <Card key={bulletin.id} className="hover:shadow-md transition-shadow py-2 gap-2">
            <CardHeader className="py-2 px-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <IconFileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{bulletin.semester}</CardTitle>
                      <CardDescription className="text-xs">
                        Année scolaire {bulletin.year}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(getMentionColor(bulletin.mention), "text-xs")}
                >
                  {bulletin.mention}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Moyenne générale</p>
                  <p className="text-lg font-bold text-primary">
                    {bulletin.average.toFixed(2)} / 20
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Classement</p>
                  <p className="text-lg font-bold">
                    {bulletin.rank}<span className="text-xs font-normal text-muted-foreground"> / {bulletin.totalStudents}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date d'émission</p>
                  <p className="text-sm font-medium">
                    {format(new Date(bulletin.issueDate), 'd MMM yyyy', { locale: fr })}
                  </p>
                </div>
              </div>
              {bulletin.downloadUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(bulletin.downloadUrl!, bulletin.semester)}
                  className="w-full md:w-auto"
                >
                  <IconDownload className="h-3.5 w-3.5 mr-1.5" />
                  Télécharger le bulletin
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-48 py-8">
            <IconFileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Aucun bulletin disponible pour le moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

