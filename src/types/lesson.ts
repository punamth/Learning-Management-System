export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string; // textual content or summary
  videoUrl?: string; // optional video link
  order: number; // lesson sequence in course
  createdAt?: string;
  updatedAt?: string;
}
