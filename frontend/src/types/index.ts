export interface User {
  id: string;
  uid?: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'exam_department';
  rollNumber?: string;
  department?: string;
  semester?: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  enrolled?: boolean;
}

export interface Attendance {
  subject: string;
  percentage: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  room: string;
}

export interface FeeDetails {
  total: number;
  paid: number;
  remaining: number;
}

export interface ExamResult {
  semester: number;
  cgpa: number;
  grade: string;
}

export interface SubjectMarks {
  subject: string;
  internal: number;
  external: number;
  total: number;
  grade: string;
}