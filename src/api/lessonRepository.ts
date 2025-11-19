import axios from "axios";

const API_URL = "http://localhost:5000";

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  courseId: string;
}

export const lessonRepository = {
  getByCourse: async (courseId: string): Promise<Lesson[]> => {
    const res = await axios.get(`${API_URL}/courses/${courseId}/lessons`);
    return res.data;
  },

  create: async (
    courseId: string,
    data: Partial<Lesson>,
    videoFile?: File
  ): Promise<Lesson> => {
    const formData = new FormData();
    formData.append("title", data.title || "");
    if (data.content) formData.append("content", data.content);
    if (videoFile) formData.append("video", videoFile);

    const res = await axios.post(
      `${API_URL}/courses/${courseId}/lessons`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },
};
