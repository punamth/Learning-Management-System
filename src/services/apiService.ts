import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:5001/api";

class ApiService {
  private axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  get<T>(url: string, params?: any) {
    return this.axiosInstance.get<T>(url, { params }).then(res => res.data);
  }

  post<T>(url: string, data?: any) {
    const isFormData = data instanceof FormData;
    return this.axiosInstance.post<T>(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    }).then(res => res.data);
  }

  put<T>(url: string, data?: any) {
    const isFormData = data instanceof FormData;
    return this.axiosInstance.put<T>(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    }).then(res => res.data);
  }

  delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url).then(res => res.data);
  }

  uploadFile<T>(url: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.axiosInstance.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(res => res.data);
  }
}

export const apiService = new ApiService();
export default apiService;
