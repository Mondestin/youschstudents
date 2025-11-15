export interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  coefficient: number;
  semester: string;
  date: string;
  teacher: string;
  comment?: string;
  type?: 'exam' | 'practical' | 'assignment';
}

export interface GradeStats {
  gpa: number;
  average: number;
  rank: number;
  totalStudents: number;
  improvement: number;
}

