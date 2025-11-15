import { Course } from './types';

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Mathématiques Avancées',
    code: 'MATH-301',
    teacher: 'M. Dupont',
    teacherEmail: 'dupont@school.fr',
    credits: 6,
    schedule: [
      {
        day: 'Lundi',
        startTime: '08:00',
        endTime: '10:00',
        room: 'A101'
      },
      {
        day: 'Mercredi',
        startTime: '14:00',
        endTime: '16:00',
        room: 'A101'
      }
    ],
    description: 'Cours approfondi sur les mathématiques avancées incluant l\'analyse, l\'algèbre linéaire et les probabilités.',
    semester: 'Semestre 1',
    enrolledStudents: 28,
    maxStudents: 30,
    materials: [
      {
        id: '1',
        name: 'Cours 1 - Introduction',
        type: 'pdf',
        url: '/materials/math-1.pdf',
        uploadDate: '2024-09-15'
      },
      {
        id: '2',
        name: 'Exercices pratiques',
        type: 'pdf',
        url: '/materials/math-exercises.pdf',
        uploadDate: '2024-09-20'
      }
    ],
    assignments: [
      {
        id: '1',
        title: 'Devoir maison - Chapitre 3',
        dueDate: '2024-12-10',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Projet final',
        dueDate: '2024-12-20',
        status: 'pending'
      },
      {
        id: '3',
        title: 'Contrôle continu 1',
        dueDate: '2024-11-15',
        status: 'graded',
        grade: 16.5
      }
    ]
  },
  {
    id: '2',
    name: 'Physique Quantique',
    code: 'PHYS-401',
    teacher: 'Mme. Martin',
    teacherEmail: 'martin@school.fr',
    credits: 5,
    schedule: [
      {
        day: 'Mardi',
        startTime: '09:00',
        endTime: '11:30',
        room: 'LAB-205'
      },
      {
        day: 'Jeudi',
        startTime: '09:00',
        endTime: '11:30',
        room: 'LAB-205'
      }
    ],
    description: 'Introduction à la physique quantique et ses applications modernes.',
    semester: 'Semestre 1',
    enrolledStudents: 24,
    maxStudents: 25,
    materials: [
      {
        id: '1',
        name: 'Vidéo - Expérience de Young',
        type: 'video',
        url: '/materials/young-experiment.mp4',
        uploadDate: '2024-09-18'
      }
    ],
    assignments: [
      {
        id: '1',
        title: 'Rapport de laboratoire',
        dueDate: '2024-12-05',
        status: 'submitted'
      }
    ]
  },
  {
    id: '3',
    name: 'Littérature Française',
    code: 'LIT-201',
    teacher: 'Mme. Dubois',
    teacherEmail: 'dubois@school.fr',
    credits: 4,
    schedule: [
      {
        day: 'Lundi',
        startTime: '14:00',
        endTime: '16:00',
        room: 'B203'
      },
      {
        day: 'Vendredi',
        startTime: '10:00',
        endTime: '12:00',
        room: 'B203'
      }
    ],
    description: 'Étude approfondie de la littérature française du XIXe et XXe siècle.',
    semester: 'Semestre 1',
    enrolledStudents: 32,
    maxStudents: 35,
    assignments: [
      {
        id: '1',
        title: 'Analyse de texte - Baudelaire',
        dueDate: '2024-12-08',
        status: 'pending'
      }
    ]
  },
  {
    id: '4',
    name: 'Anglais des Affaires',
    code: 'ENG-301',
    teacher: 'Mme. Moreau',
    teacherEmail: 'moreau@school.fr',
    credits: 3,
    schedule: [
      {
        day: 'Mardi',
        startTime: '14:00',
        endTime: '16:00',
        room: 'C105'
      }
    ],
    description: 'Anglais professionnel et communication d\'affaires.',
    semester: 'Semestre 1',
    enrolledStudents: 20,
    maxStudents: 25
  }
];

