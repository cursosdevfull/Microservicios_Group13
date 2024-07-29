import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { ErrorBase } from "../../core/errors/error-base";
import { ValidatorService } from "../../core/validator/validator.service";
import { SaveAppointmentApplication } from "./application/save-appointment.application";
import { Appointment, AppointmentProperties } from "./domain/appointment";
import { SaveAppointmentValidator } from "./infrastructure/validators/save-appointment.validator";

export class AppointmentController {
  constructor(private readonly saveApplication: SaveAppointmentApplication) {}

  public async save(req: Request, res: Response) {
    const {
      patientId,
      centerId,
      specialtyId,
      appointmentDate,
      appointmentTime,
      appointmentStatus,
      country,
    } = req.body;
    const errors = await ValidatorService.runValidation(
      req.body,
      SaveAppointmentValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const appointmentId = uuidv4();

    const props: AppointmentProperties = {
      appointmentId,
      patientId,
      centerId,
      specialtyId,
      appointmentDate,
      appointmentTime,
      appointmentStatus,
      country,
    };
    const appointment = new Appointment(props);

    const appointmentInserted = await this.saveApplication.handle(appointment);

    if (appointmentInserted instanceof ErrorBase) {
      return res.status(500).json({ messages: appointmentInserted.stack });
    }

    return res.json(appointmentInserted);
  }
}
