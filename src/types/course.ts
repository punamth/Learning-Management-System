export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string; // optional, you can provide default if missing
  instructor: string;
  lessonsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
