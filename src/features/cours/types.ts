export interface Course {
  id: string;
  name: string;
  code: string;
  teacher: string;
  teacherEmail: string;
  credits: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  description: string;
  semester: string;
  enrolledStudents: number;
  maxStudents: number;
  materials?: {
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'link' | 'other';
    url: string;
    uploadDate: string;
  }[];
  assignments?: {
    id: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
  }[];
}

