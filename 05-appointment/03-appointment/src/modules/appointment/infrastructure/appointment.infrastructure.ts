import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ERROR_MESSAGES } from "../../../core/errors/error-base";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { AppointmentDto } from "./dtos/appointment.dto";
import { AppointmentEntity } from "./entities/appoitment.entity";
import { AppointmentDatabaseException } from "./exceptions/appointment.exception";

export type AppointmentSaveResult = Result<
  Appointment,
  AppointmentDatabaseException
>;

export class AppointmentInfrastructure implements AppointmentRepository {
  async saveToDatabase(
    appointment: Appointment
  ): Promise<AppointmentSaveResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);
      const appointmentEntity = AppointmentDto.fromDomainToData(
        appointment
      ) as AppointmentEntity;

      await repository.save(appointmentEntity);
      return ok(appointment);
    } catch (error: any) {
      return err(
        new AppointmentDatabaseException(
          "Error to save appoinment",
          ERROR_MESSAGES.APPOINMENT_INSERT,
          error.stack
        )
      );
    }
  }
  saveToKafka(appointment: Appointment, topic: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(appointmentId: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
