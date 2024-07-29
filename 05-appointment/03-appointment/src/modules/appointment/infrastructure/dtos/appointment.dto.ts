import { plainToInstance } from "class-transformer";

import { Appointment, AppointmentProperties } from "../../domain/appointment";
import { AppointmentEntity } from "../entities/appoitment.entity";

export class AppointmentDto {
  static fromDomainToData(
    model: Appointment | Appointment[]
  ): AppointmentEntity | AppointmentEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) =>
        this.fromDomainToData(item)
      ) as AppointmentEntity[];
    }

    return plainToInstance(AppointmentEntity, model.properties);
  }

  static fromDataToDomain(
    entity: AppointmentEntity | AppointmentEntity[]
  ): Appointment | Appointment[] {
    if (Array.isArray(entity)) {
      return entity.map((item) => this.fromDataToDomain(item)) as Appointment[];
    }

    const props: AppointmentProperties = {
      appointmentId: entity.appointmentId,
      patientId: entity.patientId,
      centerId: entity.centerId,
      specialtyId: entity.specialtyId,
      appointmentDate: entity.appointmentDate,
      appointmentTime: entity.appointmentTime,
      appointmentStatus: entity.appointmentStatus,
      country: entity.country,
      createdAt: entity.createdAt,
    };

    return new Appointment(props);
  }
}
