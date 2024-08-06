import { ApiRepository } from "../domain/repositories/api.repository";
import { ApiInfrastructure } from "../infrastructure/api.infrastructure";

export class ApiApplication {
  private readonly repository: ApiRepository = new ApiInfrastructure();

  async callEndpoint(url: string, method: string, data?: any): Promise<any> {
    return this.repository.requestByType(url, method, data);
  }
}
