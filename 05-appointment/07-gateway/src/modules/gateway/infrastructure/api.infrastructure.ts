import axios, { AxiosRequestConfig } from "axios";

import { ApiRepository } from "../domain/repositories/api.repository";

export class ApiInfrastructure implements ApiRepository {
  async requestByType(url: string, method: string, data?: any): Promise<any> {
    const request: AxiosRequestConfig = {
      method,
      url,
      responseType: "json",
      data,
    };

    try {
      const result = await axios.request(request);
      return result.data;
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  }
}
