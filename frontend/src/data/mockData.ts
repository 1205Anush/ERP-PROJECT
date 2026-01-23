import { Course, Attendance, Notice, TimetableEntry, FeeDetails, ExamResult, SubjectMarks } from '../types';

export const mockCourses: Course[] = [
  { id: '1', name: 'Data Structures', code: 'CS201', credits: 4 },
  { id: '2', name: 'Database Management', code: 'CS202', credits: 3 },
  { id: '3', name: 'Web Development', code: 'CS203', credits: 4 },
  { id: '4', name: 'Computer Networks', code: 'CS204', credits: 3 },
  { id: '5', name: 'Software Engineering', code: 'CS205', credits: 4 }
];

export const mockAttendance: Attendance[] = [
  { subject: 'Data Structures', percentage: 85 },
  { subject: 'Database Management', percentage: 92 },
  { subject: 'Web Development', percentage: 78 },
  { subject: 'Computer Networks', percentage: 88 }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule',
    content: 'Mid-term examinations will begin from March 15th, 2024.',
    date: '2024-03-01',
    author: 'Dr. Smith',
    status: 'approved'
  },
  {
    id: '2',
    title: 'Library Closure',
    content: 'Library will remain closed on March 10th for maintenance.',
    date: '2024-03-05',
    author: 'Prof. Johnson',
    status: 'approved'
  }
];

export const mockTimetable: TimetableEntry[] = [
  { day: 'Monday', time: '9:00-10:00', subject: 'Data Structures', room: 'Room 101' },
  { day: 'Monday', time: '10:00-11:00', subject: 'Database Management', room: 'Room 102' },
  { day: 'Tuesday', time: '9:00-10:00', subject: 'Web Development', room: 'Room 103' },
  { day: 'Tuesday', time: '11:00-12:00', subject: 'Computer Networks', room: 'Room 104' },
  { day: 'Wednesday', time: '9:00-10:00', subject: 'Software Engineering', room: 'Room 105' }
];

export const mockFeeDetails: FeeDetails = {
  total: 50000,
  paid: 30000,
  remaining: 20000
};

export const mockExamResults: ExamResult[] = [
  { semester: 1, cgpa: 8.5, grade: 'A' },
  { semester: 2, cgpa: 8.2, grade: 'A' },
  { semester: 3, cgpa: 8.7, grade: 'A' }
];

export const mockSubjectMarks: SubjectMarks[] = [
  { subject: 'Data Structures', internal: 18, external: 75, total: 93, grade: 'A+' },
  { subject: 'Database Management', internal: 16, external: 68, total: 84, grade: 'A' },
  { subject: 'Web Development', internal: 19, external: 72, total: 91, grade: 'A+' },
  { subject: 'Computer Networks', internal: 17, external: 70, total: 87, grade: 'A' }
];