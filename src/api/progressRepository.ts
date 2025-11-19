import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // replace with your backend URL

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  score?: number; // optional, in case tests are tracked here
}

// ✅ Get user progress
export const getUserProgress = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE}/users/${userId}/progress`);
    return response.data; // assuming backend returns { userId, courseId, completedLessons, ... }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
};

// ✅ Update user progress
export const updateUserProgress = async (
  userId: string,
  progressData: Partial<Progress>
) => {
  try {
    const response = await axios.put(
      `${API_BASE}/users/${userId}/progress`,
      progressData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};
