import { apiService } from "../services/apiService";
import type { Lesson } from "../types/lesson";

export const lessonRepository = {
  getByCourse: (courseId: number): Promise<Lesson[]> =>
    apiService.get<Lesson[]>(`/courses/${courseId}/lessons`),

  create: (courseId: number, data: Partial<Lesson>, videoFile?: File): Promise<Lesson> => {
    if (videoFile) return apiService.uploadFile<Lesson>(`/courses/${courseId}/lessons`, videoFile);
    return apiService.post<Lesson>(`/courses/${courseId}/lessons`, data);
  },

  update: (lessonId: number, data: Partial<Lesson>, videoFile?: File): Promise<Lesson> => {
    if (videoFile) return apiService.uploadFile<Lesson>(`/lessons/${lessonId}`, videoFile);
    return apiService.put<Lesson>(`/lessons/${lessonId}`, data);
  },

  delete: (lessonId: number): Promise<void> => apiService.delete(`/lessons/${lessonId}`),
};
