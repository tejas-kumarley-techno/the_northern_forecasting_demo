import axios, { AxiosRequestConfig, Method } from "axios";
type RequestBody = undefined | Record<string, unknown> | FormData;

class ApiService {
  private baseUrl: string;
  // private username: string;
  // private password: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URI || "";
    // this.username = import.meta.env.VITE_API_USERNAME || "";
    // this.password = import.meta.env.VITE_API_PASSWORD || "";
  }

  private async request<T>(
    endpoint: string,
    method: Method = "GET",
    body: RequestBody = undefined,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/${
      endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
    }`;

    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        accept: "application/json",
        "x-api-key": "FYIuWWtQ7bCuqtbA7slnu9tpKnewyU7JApmMiGO8",
        ...headers,
      },
    };

    if (body instanceof FormData) {
      config.data = body;
    } else if (body) {
      config.data = body;
    }

    try {
      const response = await axios.request<T>(config);
      return response.data;
    } catch (error: any) {
      console.error("API request error:", error);
      throw error;
    }
  }

  get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  post<T>(
    endpoint: string,
    body: RequestBody,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", body, headers);
  }

  put<T>(
    endpoint: string,
    body: RequestBody,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", body, headers);
  }

  delete<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}

export const apiService = new ApiService();
