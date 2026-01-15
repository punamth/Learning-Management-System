export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // only for registration/login, not stored in frontend after auth
  enrolledCourses?: string[]; // list of course IDs
  progress?: Progress[];
}

export interface Progress {
  courseId: string;
  completedLessons: string[]; // array of lesson IDs
  score?: number; // optional, for tests
}
