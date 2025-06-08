export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId: string;
  profilePhoto?: string;
  academicProgram: string;
  department: string;
  yearLevel: string;
  contactInfo?: string;
  enrolledCourses: string[];
  createdAt: Date;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
  courseCode: string;
  resourceType: 'Lecture Notes' | 'Assignment' | 'Research' | 'Study Guide' | 'Project Template' | 'Other';
  visibility: 'Public' | 'Class Only' | 'Private';
  downloadCount: number;
  tags: string[];
  description?: string;
}

export interface Course {
  code: string;
  name: string;
  department: string;
  instructor: string;
  semester: string;
  enrolledStudents: string[];
}

export interface DownloadLog {
  id: string;
  fileId: string;
  userId: string;
  downloadedAt: Date;
  ipAddress: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
};

export type SearchFilters = {
  courseCode?: string;
  resourceType?: string;
  uploadedBy?: string;
  keywords?: string;
  department?: string;
};