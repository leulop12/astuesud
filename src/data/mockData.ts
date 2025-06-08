import { Course, FileItem } from '../types';

export const mockCourses: Course[] = [
  {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Engineering',
    instructor: 'Dr. Smith',
    semester: 'Fall 2024',
    enrolledStudents: ['1', '3', '4'],
  },
  {
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    department: 'Engineering',
    instructor: 'Prof. Johnson',
    semester: 'Fall 2024',
    enrolledStudents: ['1', '5'],
  },
  {
    code: 'BIO101',
    name: 'General Biology',
    department: 'Sciences',
    instructor: 'Dr. Wilson',
    semester: 'Fall 2024',
    enrolledStudents: ['2', '6'],
  },
  {
    code: 'MATH301',
    name: 'Calculus III',
    department: 'Mathematics',
    instructor: 'Prof. Davis',
    semester: 'Fall 2024',
    enrolledStudents: ['1', '7'],
  },
];

export const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'CS101_Lecture_01_Introduction.pdf',
    size: 2500000,
    type: 'application/pdf',
    uploadedBy: '1',
    uploadedAt: new Date('2024-01-20'),
    courseCode: 'CS101',
    resourceType: 'Lecture Notes',
    visibility: 'Class Only',
    downloadCount: 45,
    tags: ['introduction', 'fundamentals', 'programming'],
    description: 'Introduction to programming concepts and computer science fundamentals',
  },
  {
    id: '2',
    name: 'Data_Structures_Cheat_Sheet.docx',
    size: 850000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: '1',
    uploadedAt: new Date('2024-01-18'),
    courseCode: 'CS201',
    resourceType: 'Study Guide',
    visibility: 'Public',
    downloadCount: 89,
    tags: ['data structures', 'algorithms', 'cheat sheet'],
    description: 'Comprehensive cheat sheet for common data structures',
  },
  {
    id: '3',
    name: 'Biology_Lab_Report_Template.docx',
    size: 450000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: '2',
    uploadedAt: new Date('2024-01-15'),
    courseCode: 'BIO101',
    resourceType: 'Project Template',
    visibility: 'Class Only',
    downloadCount: 23,
    tags: ['biology', 'lab report', 'template'],
    description: 'Standard template for biology lab reports',
  },
  {
    id: '4',
    name: 'Calculus_Study_Notes.pdf',
    size: 1800000,
    type: 'application/pdf',
    uploadedBy: '1',
    uploadedAt: new Date('2024-01-12'),
    courseCode: 'MATH301',
    resourceType: 'Study Guide',
    visibility: 'Public',
    downloadCount: 67,
    tags: ['calculus', 'mathematics', 'derivatives', 'integrals'],
    description: 'Comprehensive study notes covering derivatives and integrals',
  },
];

export const departments = [
  'Engineering',
  'Sciences',
  'Mathematics',
  'Liberal Arts',
  'Business',
  'Medicine',
  'Law',
  'Education',
];

export const yearLevels = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate',
];

export const resourceTypes = [
  'Lecture Notes',
  'Assignment',
  'Research',
  'Study Guide',
  'Project Template',
  'Other',
];