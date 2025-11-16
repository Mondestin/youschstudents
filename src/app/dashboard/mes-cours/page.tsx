import PageContainer from '@/components/layout/page-container';
import CourseCard from '@/features/cours/components/course-card';
import { mockCourses } from '@/features/cours/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { IconBook, IconCalendar, IconClipboardCheck } from '@tabler/icons-react';

export const metadata = {
  title: 'Mes cours - Étudiants'
};

export default async function MesCoursPage() {
  const totalCredits = mockCourses.reduce((sum, course) => sum + course.credits, 0);
  const totalAssignments = mockCourses.reduce((sum, course) => 
    sum + (course.assignments?.filter(a => a.status === 'pending').length || 0), 0
  );

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes cours</h1>
          <p className="text-muted-foreground">
            Gérez vos cours, devoirs et matériaux pédagogiques
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
          <Card className="py-3 gap-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
              <CardTitle className="text-sm font-medium">Cours inscrits</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{mockCourses.length}</span>
                <IconBook className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalCredits} crédits au total
              </p>
            </CardContent>
          </Card>

          <Card className="py-3 gap-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
              <CardTitle className="text-sm font-medium">Devoirs en attente</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-yellow-600">{totalAssignments}</span>
                <IconClipboardCheck className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Devoirs à rendre
              </p>
            </CardContent>
          </Card>

          <Card className="py-3 gap-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
              <CardTitle className="text-sm font-medium">Semestre actuel</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">Semestre 1</span>
                <IconCalendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                2024-2025
              </p>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Courses List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="h-auto bg-transparent p-0 gap-0 border-b border-border rounded-none border-t-0 border-l-0 border-r-0">
            <TabsTrigger 
              value="all"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconBook className="h-4 w-4 mr-2" />
              Tous les cours
            </TabsTrigger>
            <TabsTrigger 
              value="current"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconCalendar className="h-4 w-4 mr-2" />
              Semestre actuel
            </TabsTrigger>
            <TabsTrigger 
              value="assignments"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconClipboardCheck className="h-4 w-4 mr-2" />
              Avec devoirs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="current" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockCourses
                .filter(course => course.semester === 'Semestre 1')
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockCourses
                .filter(course => (course.assignments?.filter(a => a.status === 'pending').length || 0) > 0)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
