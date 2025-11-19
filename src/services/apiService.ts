import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiService {
  private axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Optionally attach a token if you are using auth
  setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  get<T>(url: string, params?: any) {
    return this.axiosInstance.get<T>(url, { params }).then(res => res.data);
  }

  post<T>(url: string, data: any) {
    return this.axiosInstance.post<T>(url, data).then(res => res.data);
  }

  put<T>(url: string, data: any) {
    return this.axiosInstance.put<T>(url, data).then(res => res.data);
  }

  delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url).then(res => res.data);
  }
}

// Singleton instance
export const apiService = new ApiService();
export default apiService;
