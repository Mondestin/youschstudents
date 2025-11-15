'use client';

import { useMemo, useState } from 'react';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import { gradesColumns } from './grades-columns';
import { Grade } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GradesTableProps {
  grades: Grade[];
}

export default function GradesTable({ grades }: GradesTableProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const semesters = Array.from(new Set(grades.map(g => g.semester)));
  const subjects = Array.from(new Set(grades.map(g => g.subject)));

  const filteredGrades = useMemo(() => {
    return grades.filter(grade => {
      // Filter by semester
      if (selectedSemester !== 'all' && grade.semester !== selectedSemester) return false;
      
      // Filter by subject
      if (selectedSubject !== 'all' && grade.subject !== selectedSubject) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSubject = grade.subject.toLowerCase().includes(query);
        const matchesTeacher = grade.teacher.toLowerCase().includes(query);
        const matchesComment = grade.comment?.toLowerCase().includes(query);
        if (!matchesSubject && !matchesTeacher && !matchesComment) return false;
      }
      
      return true;
    });
  }, [grades, selectedSemester, selectedSubject, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <ReusableTableWrapper
      data={filteredGrades}
      totalItems={filteredGrades.length}
      columns={gradesColumns}
      defaultPageSize={10}
      searchPlaceholder="Rechercher une note..."
      exportButtonText="Exporter les notes"
      paginationText={{
        showing: 'Affichage',
        to: 'à',
        of: 'sur',
        results: 'résultats'
      }}
      onSearch={handleSearch}
      additionalFilters={
        <div className="flex gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Trimestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les trimestres</SelectItem>
              {semesters.map(sem => (
                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Matière" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les matières</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}

