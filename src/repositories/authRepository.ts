import axios from "axios";

const API_URL = "http://localhost:5001/api"; // replace with your backend base URL

export interface AuthResponse {
  token: string;
  user: any;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authRepository = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const res = await axios.post(`${API_URL}/Auth/register`, data);
    return res.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const res = await axios.post(`${API_URL}/Auth/login`, data);
    return res.data;
  },
};
