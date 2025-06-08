import { User } from '../types';

// Mock authentication utilities
export const validateEduEmail = (email: string): boolean => {
  return email.endsWith('.edu');
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@university.edu',
    firstName: 'John',
    lastName: 'Doe',
    studentId: 'STU001',
    academicProgram: 'Computer Science',
    department: 'Engineering',
    yearLevel: 'Junior',
    enrolledCourses: ['CS101', 'CS201', 'MATH301'],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'jane.smith@university.edu',
    firstName: 'Jane',
    lastName: 'Smith',
    studentId: 'STU002',
    academicProgram: 'Biology',
    department: 'Sciences',
    yearLevel: 'Senior',
    enrolledCourses: ['BIO101', 'BIO301', 'CHEM201'],
    createdAt: new Date('2024-01-10'),
  },
];

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication - in production, this would call your backend API
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password123') {
    return user;
  }
  return null;
};

export const registerUser = async (userData: Partial<User>, password: string): Promise<User | null> => {
  // Mock registration - in production, this would call your backend API
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  if (!userData.email || !validateEduEmail(userData.email)) {
    throw new Error('Valid .edu email required');
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    studentId: userData.studentId || '',
    academicProgram: userData.academicProgram || '',
    department: userData.department || '',
    yearLevel: userData.yearLevel || '',
    enrolledCourses: userData.enrolledCourses || [],
    createdAt: new Date(),
  };
  
  mockUsers.push(newUser);
  return newUser;
};

export const getCurrentUser = (): User | null => {
  // In production, this would check for valid session/token
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};