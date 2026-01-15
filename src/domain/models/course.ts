export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailPath?: string;

  instructor?: string;
  lessonsCount?: number;
  createdAt?: string;
  updatedAt?: string;

  tests?: any[];
}
