import apiService from "../../application/services/apiService";
import type { Lesson } from "../../domain/models/lesson";

export const lessonRepository = {
  async getByCourse(courseId: number): Promise<Lesson[]> {
    const lessons = await apiService.get<Lesson[]>(`/courses/${courseId}/lessons`);
    return lessons.map((lesson) => ({
      ...lesson,
      videoUrl: lesson.videoPath
        ? `${import.meta.env.VITE_API_BASE_URL}${lesson.videoPath}`
        : undefined,
    }));
  },

  async create(courseId: number, data: Partial<Lesson>, videoFile?: File) {
    const form = new FormData();
    if (data.title) form.append("title", data.title);
    if (data.contentText) form.append("contentText", data.contentText);
    if (videoFile) form.append("videoFile", videoFile);

    const lesson = await apiService.post<Lesson>(`/courses/${courseId}/lessons`, form);
    return {
      ...lesson,
      videoUrl: lesson.videoPath
        ? `${import.meta.env.VITE_API_BASE_URL}${lesson.videoPath}`
        : undefined,
    };
  },

  async update(courseId: number, lessonId: number, data: Partial<Lesson>, videoFile?: File) {
    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) form.append(key, value.toString());
    });

    if (videoFile) form.append("videoFile", videoFile);

    const lesson = await apiService.put<Lesson>(
      `/courses/${courseId}/lessons/${lessonId}`,
      form
    );

    return {
      ...lesson,
      videoUrl: lesson.videoPath
        ? `${import.meta.env.VITE_API_BASE_URL}${lesson.videoPath}`
        : undefined,
    };
  },

  async delete(courseId: number, lessonId: number) {
    return apiService.delete(`/courses/${courseId}/lessons/${lessonId}`);
  },
};
