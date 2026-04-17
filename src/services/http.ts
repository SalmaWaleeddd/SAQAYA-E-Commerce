// services/http.ts
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

const API_URL = "https://dummyjson.com";
const API_TIMEOUT = 30000;

const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);
export const httpClient = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.get(url, config).then((res) => res.data);
  },

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return http.post(url, data, config).then((res) => res.data);
  },

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return http.put(url, data, config).then((res) => res.data);
  },

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return http.patch(url, data, config).then((res) => res.data);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.delete(url, config).then((res) => res.data);
  },
};

export default http;
