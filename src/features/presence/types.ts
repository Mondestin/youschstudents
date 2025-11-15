export interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  teacher: string;
  notes?: string;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendanceRate: number;
  bySubject: {
    subject: string;
    attendanceRate: number;
    totalClasses: number;
    presentClasses: number;
  }[];
}

