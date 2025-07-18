import { apiService } from "./api.service";
import mockResponse from "../constants/mockResponse.json";
import { WeeklyProduct } from "@/types";
class UploadService {
  private api = apiService;
  private controller = "";
  private useMock = false;
  async uploadAndTrain(formData: FormData): Promise<any> {
    if (this.useMock) {
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 5000);
      });
    }
    return this.api.post(`${this.controller}/train`, formData, {});
  }
  async predictResults(body: WeeklyProduct): Promise<any> {
    if (this.useMock) {
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({});
        }, 5000);
      });
    }
    return this.api.post(`${this.controller}/predict`, body, {});
  }
}

export const uploadService = new UploadService();
