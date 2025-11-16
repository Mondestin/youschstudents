'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import AttendanceOverview from '@/features/presence/components/attendance-overview';
import AttendanceCalendar from '@/features/presence/components/attendance-calendar';
import AttendanceTable from '@/features/presence/components/attendance-table';
import JustifyAbsenceModal from '@/features/presence/components/justify-absence-modal';
import { mockAttendanceStats, mockAttendanceRecords } from '@/features/presence/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { IconCalendar, IconClock, IconList, IconFileText } from '@tabler/icons-react';

export default function PresencePage() {
  const [isJustifyModalOpen, setIsJustifyModalOpen] = useState(false);
  
  // Sort records by date (most recent first)
  const sortedRecords = mockAttendanceRecords
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleJustifyAbsence = (data: {
    scope: 'whole_day' | 'subject';
    subject?: string;
    startDate: Date;
    endDate?: Date;
    note: string;
    files?: File[];
  }) => {
    // TODO: Implement API call to submit absence justification
    console.log('Justifying absence:', data);
  };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assiduités</h1>
          <p className="text-muted-foreground">
            Suivez votre assiduité et vos absences
          </p>
        </div>

        {/* Attendance Overview */}
        <div className="mt-4">
          <AttendanceOverview stats={mockAttendanceStats} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="h-auto bg-transparent p-0 gap-0 border-b border-border rounded-none border-t-0 border-l-0 border-r-0">
              <TabsTrigger 
                value="calendar"
                className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                <IconCalendar className="h-4 w-4 mr-2" />
                Calendrier
              </TabsTrigger>
              <TabsTrigger 
                value="recent"
                className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                <IconClock className="h-4 w-4 mr-2" />
                Récent
              </TabsTrigger>
              <TabsTrigger 
                value="by-subject"
                className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                <IconList className="h-4 w-4 mr-2" />
                Par matière
              </TabsTrigger>
            </TabsList>
            <div className="flex justify-end">
              <Button onClick={() => setIsJustifyModalOpen(true)}>
                <IconFileText className="h-4 w-4 mr-2" />
                Justifier une absence
              </Button>
            </div>
          </div>

          <TabsContent value="calendar" className="space-y-4">
            <AttendanceCalendar records={mockAttendanceRecords} />
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <AttendanceTable records={sortedRecords} />
          </TabsContent>

          <TabsContent value="by-subject" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assiduité par matière</CardTitle>
                <CardDescription>
                  Taux d'assiduité détaillé par matière
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttendanceStats.bySubject.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.subject}</span>
                        <span className="text-sm font-semibold">
                          {subject.attendanceRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{subject.presentClasses} assiduités</span>
                        <span>•</span>
                        <span>{subject.totalClasses} cours au total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Justify Absence Modal */}
      <JustifyAbsenceModal
        open={isJustifyModalOpen}
        onOpenChange={setIsJustifyModalOpen}
        onSubmit={handleJustifyAbsence}
      />
    </PageContainer>
  );
}
