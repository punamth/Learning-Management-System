export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string; // textual content or summary
  videoUrl?: string; // optional video link
  order: number; // lesson sequence in course
  createdAt?: string;
  updatedAt?: string;
}
