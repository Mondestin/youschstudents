import PageContainer from '@/components/layout/page-container';
import NotesOverview from '@/features/notes/components/notes-overview';
import GradesTable from '@/features/notes/components/grades-table';
import GradesDetails from '@/features/notes/components/grades-details';
import BulletinsList from '@/features/notes/components/bulletins-list';
import { mockGradeStats, mockGrades } from '@/features/notes/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconFileText, IconList, IconReport } from '@tabler/icons-react';

export const metadata = {
  title: 'Notes - Étudiants'
};

export default async function NotesPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
            <p className="text-muted-foreground">
              Consultez vos notes et votre progression académique
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <NotesOverview stats={mockGradeStats} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="h-auto bg-transparent p-0 gap-0 border-b border-border rounded-none border-t-0 border-l-0 border-r-0">
            <TabsTrigger 
              value="overview"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconFileText className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconList className="h-4 w-4 mr-2" />
              Détails des notes
            </TabsTrigger>
            <TabsTrigger 
              value="bulletins"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconReport className="h-4 w-4 mr-2" />
              Bulletins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <GradesTable grades={mockGrades} />
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <GradesDetails grades={mockGrades} />
          </TabsContent>

          <TabsContent value="bulletins" className="space-y-4">
            <BulletinsList />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
