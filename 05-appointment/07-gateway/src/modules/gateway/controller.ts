import { Request, Response } from 'express';

import { Parameters } from '../../core/parameters/parameters';
import { ApiApplication } from './application/api.application';

export class ApiController {
  private readonly application: ApiApplication = new ApiApplication();

  async createAppointment(request: Request, response: Response): Promise<void> {
    const data = request.body;
    const url = Parameters.urlServiceAppointmentCreate;
    const method = "post";

    const result = await this.application.callEndpoint(url, method, data);

    response.json(result);
  }

  async login(request: Request, response: Response): Promise<void> {
    const data = request.body;
    const url = Parameters.urlServiceAuthLogin;
    const method = "post";

    const result = await this.application.callEndpoint(url, method, data);

    response.json(result);
  }

  async register(request: Request, response: Response): Promise<void> {
    const data = request.body;
    const url = Parameters.urlServiceRegisterUser;
    const method = "post";

    const result = await this.application.callEndpoint(url, method, data);

    response.json(result);
  }
}
