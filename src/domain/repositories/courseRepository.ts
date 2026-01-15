import apiService from "../../application/services/apiService";

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailPath?: string;
}

export const courseRepository = {
  getAll: async (): Promise<Course[]> => apiService.get("/Courses"),
  getById: async (id: number): Promise<Course> => apiService.get(`/Courses/${id}`),
  create: async (data: FormData | Partial<Course>): Promise<Course> =>
  apiService.post("/Courses", data),

  update: async (id: number, data: FormData | Partial<Course>): Promise<Course> =>
    apiService.put(`/Courses/${id}`, data),

  delete: async (id: number): Promise<void> => apiService.delete(`/Courses/${id}`),
  enroll: async (id: number): Promise<void> => apiService.post(`/Courses/${id}/enroll`),
};
