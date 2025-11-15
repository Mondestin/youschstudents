import { Grade, GradeStats } from './types';

export const mockGradeStats: GradeStats = {
  gpa: 14.5,
  average: 13.2,
  rank: 8,
  totalStudents: 32,
  improvement: 2.3
};

export const mockGrades: Grade[] = [
  {
    id: '1',
    subject: 'Mathématiques',
    grade: 16.5,
    maxGrade: 20,
    coefficient: 4,
    semester: 'Trimestre 1',
    date: '2024-10-15',
    teacher: 'M. Dupont',
    comment: 'Excellent travail',
    type: 'exam'
  },
  {
    id: '2',
    subject: 'Mathématiques',
    grade: 15.0,
    maxGrade: 20,
    coefficient: 2,
    semester: 'Trimestre 1',
    date: '2024-10-20',
    teacher: 'M. Dupont',
    type: 'practical'
  },
  {
    id: '3',
    subject: 'Mathématiques',
    grade: 17.0,
    maxGrade: 20,
    coefficient: 1,
    semester: 'Trimestre 1',
    date: '2024-10-25',
    teacher: 'M. Dupont',
    type: 'assignment'
  },
  {
    id: '4',
    subject: 'Physique',
    grade: 15.0,
    maxGrade: 20,
    coefficient: 3,
    semester: 'Trimestre 1',
    date: '2024-10-18',
    teacher: 'Mme. Martin',
    type: 'exam'
  },
  {
    id: '5',
    subject: 'Physique',
    grade: 14.5,
    maxGrade: 20,
    coefficient: 2,
    semester: 'Trimestre 1',
    date: '2024-10-22',
    teacher: 'Mme. Martin',
    type: 'practical'
  },
  {
    id: '6',
    subject: 'Chimie',
    grade: 14.0,
    maxGrade: 20,
    coefficient: 3,
    semester: 'Trimestre 1',
    date: '2024-10-20',
    teacher: 'M. Bernard',
    type: 'exam'
  },
  {
    id: '7',
    subject: 'Chimie',
    grade: 15.5,
    maxGrade: 20,
    coefficient: 2,
    semester: 'Trimestre 1',
    date: '2024-10-28',
    teacher: 'M. Bernard',
    type: 'practical'
  },
  {
    id: '8',
    subject: 'Français',
    grade: 13.5,
    maxGrade: 20,
    coefficient: 4,
    semester: 'Trimestre 1',
    date: '2024-10-22',
    teacher: 'Mme. Dubois',
    comment: 'Bon progrès',
    type: 'exam'
  },
  {
    id: '9',
    subject: 'Français',
    grade: 14.0,
    maxGrade: 20,
    coefficient: 1,
    semester: 'Trimestre 1',
    date: '2024-10-30',
    teacher: 'Mme. Dubois',
    type: 'assignment'
  },
  {
    id: '10',
    subject: 'Histoire',
    grade: 15.5,
    maxGrade: 20,
    coefficient: 2,
    semester: 'Trimestre 1',
    date: '2024-10-25',
    teacher: 'M. Leroy',
    type: 'exam'
  },
  {
    id: '11',
    subject: 'Anglais',
    grade: 16.0,
    maxGrade: 20,
    coefficient: 3,
    semester: 'Trimestre 1',
    date: '2024-10-28',
    teacher: 'Mme. Moreau',
    type: 'exam'
  },
  {
    id: '12',
    subject: 'Anglais',
    grade: 15.5,
    maxGrade: 20,
    coefficient: 1,
    semester: 'Trimestre 1',
    date: '2024-11-02',
    teacher: 'Mme. Moreau',
    type: 'assignment'
  },
  {
    id: '13',
    subject: 'SVT',
    grade: 14.5,
    maxGrade: 20,
    coefficient: 2,
    semester: 'Trimestre 1',
    date: '2024-11-01',
    teacher: 'M. Petit',
    type: 'exam'
  },
  {
    id: '14',
    subject: 'SVT',
    grade: 16.0,
    maxGrade: 20,
    coefficient: 1,
    semester: 'Trimestre 1',
    date: '2024-11-05',
    teacher: 'M. Petit',
    type: 'practical'
  },
  {
    id: '15',
    subject: 'Mathématiques',
    grade: 17.0,
    maxGrade: 20,
    coefficient: 4,
    semester: 'Trimestre 2',
    date: '2024-11-10',
    teacher: 'M. Dupont',
    comment: 'Très bien',
    type: 'exam'
  },
  {
    id: '16',
    subject: 'Physique',
    grade: 15.5,
    maxGrade: 20,
    coefficient: 3,
    semester: 'Trimestre 2',
    date: '2024-11-12',
    teacher: 'Mme. Martin',
    type: 'exam'
  }
];

