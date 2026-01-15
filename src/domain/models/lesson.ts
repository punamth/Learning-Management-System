export interface Lesson {
  id: number;
  courseId: number;

  // Main fields
  title: string;
  contentText: string;    
  videoPath?: string;       
  videoUrl?: string;        
  order: number;

  // Optional metadata
  createdAt?: string;
  updatedAt?: string;
}
