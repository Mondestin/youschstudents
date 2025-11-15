import PageContainer from '@/components/layout/page-container';
import TimetableCalendar from '@/features/emploi-du-temps/components/timetable-calendar';

export const metadata = {
  title: 'Emploi du temps - Étudiants'
};

// Mock student data - replace with actual user data from your auth system
const studentName = 'Jean Dupont';
const studentClass = '3ème A';
const studentYear = '2024-2025';
const studentCourse = 'Sciences et Technologies';

export default async function EmploiDuTempsPage() {
  return (
    <div className="flex flex-col flex-1 w-full h-full p-4 lg:p-6 gap-6">
      {/* Welcome section - 2 parts */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Part 1: Welcome message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            Bienvenue, {studentName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Consultez votre emploi du temps et gérez vos cours
          </p>
        </div>
        
        {/* Part 2: Class, Year and Course - all in one div, aligned to the right */}
        <div className="flex flex-col gap-2 text-right">
          <div className="flex flex-row gap-2 justify-end items-center">
            <span className="text-xs text-muted-foreground">Classe:</span>
            <span className="text-sm font-semibold">{studentClass}</span>
          </div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <span className="text-xs text-muted-foreground">Année:</span>
            <span className="text-sm font-semibold">{studentYear}</span>
          </div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <span className="text-xs text-muted-foreground">Filière:</span>
            <span className="text-sm font-semibold">{studentCourse}</span>
          </div>
        </div>
      </div>

      {/* Calendar with margin */}
      <div className="flex-1 min-h-0">
        <TimetableCalendar />
      </div>
    </div>
  );
}

