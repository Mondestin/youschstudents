'use client';

import { useMemo, useState } from 'react';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import { attendanceColumns } from './attendance-columns';
import { AttendanceRecord } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export default function AttendanceTable({ records }: AttendanceTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = Array.from(new Set(records.map(r => r.subject))).sort();

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Filter by status
      if (statusFilter !== 'all' && record.status !== statusFilter) return false;
      
      // Filter by subject
      if (subjectFilter !== 'all' && record.subject !== subjectFilter) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSubject = record.subject.toLowerCase().includes(query);
        const matchesTeacher = record.teacher.toLowerCase().includes(query);
        const matchesNotes = record.notes?.toLowerCase().includes(query);
        if (!matchesSubject && !matchesTeacher && !matchesNotes) return false;
      }
      
      return true;
    });
  }, [records, statusFilter, subjectFilter, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <ReusableTableWrapper
      data={filteredRecords}
      totalItems={filteredRecords.length}
      columns={attendanceColumns}
      defaultPageSize={10}
      searchPlaceholder="Rechercher une assiduité..."
      exportButtonText="Exporter les assiduités"
      paginationText={{
        showing: 'Affichage',
        to: 'à',
        of: 'sur',
        results: 'résultats'
      }}
      onSearch={handleSearch}
      additionalFilters={
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="present">Présent</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Retard</SelectItem>
              <SelectItem value="excused">Justifié</SelectItem>
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par matière" />
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

