import axios from "axios";

const API_URL = "http://localhost:5000";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  // add other fields if needed
}

export const courseRepository = {
  getAll: async (): Promise<Course[]> => {
    const res = await axios.get(`${API_URL}/courses`);
    return res.data; // make sure backend returns an array
  },

  getById: async (id: string): Promise<Course> => {
    const res = await axios.get(`${API_URL}/courses/${id}`);
    return res.data;
  },

  create: async (course: Partial<Course>): Promise<Course> => {
    const res = await axios.post(`${API_URL}/courses`, course);
    return res.data;
  },

  update: async (id: string, course: Partial<Course>): Promise<Course> => {
    const res = await axios.put(`${API_URL}/courses/${id}`, course);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/courses/${id}`);
  },

  enroll: async (courseId: string): Promise<void> => {
    await axios.post(`${API_URL}/courses/${courseId}/enroll`);
  },
};
