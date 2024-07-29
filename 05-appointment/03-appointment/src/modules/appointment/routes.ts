import { Router } from 'express';

import { SaveAppointmentApplication } from './application/save-appointment.application';
import { AppointmentController } from './controller';
import { AppointmentRepository } from './domain/repositories/appointment.repository';
import { AppointmentInfrastructure } from './infrastructure/appointment.infrastructure';

class AppointmentRoutes {
  private readonly router: Router;

  constructor(private readonly controller: AppointmentController) {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/", this.controller.save.bind(this.controller));
  }

  get getRouter() {
    return this.router;
  }
}

const repository: AppointmentRepository = new AppointmentInfrastructure();
const saveAppointment = new SaveAppointmentApplication(repository);
const controller = new AppointmentController(saveAppointment);

export const appointmentRouter = new AppointmentRoutes(controller).getRouter;
