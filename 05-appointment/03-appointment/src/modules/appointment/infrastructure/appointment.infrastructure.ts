import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ERROR_MESSAGES } from "../../../core/errors/error-base";
import { KafkaRepository } from "../../kafka/domain/repositories/kafka.repository";
import { KafkaInfrastructure } from "../../kafka/infrastructure/kafka.infrastructure";
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
  private repository: KafkaRepository = new KafkaInfrastructure();

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
    this.repository.sentMessage(
      topic,
      "appointment",
      appointment.properties,
      0
    );
    return Promise.resolve();
  }

  async findById(appointmentId: string): Promise<Appointment> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);
      const appointmentEntity = await repository.findOne({
        where: { appointmentId },
      });

      const appointment = AppointmentDto.fromDataToDomain(
        appointmentEntity
      ) as Appointment;
      return appointment;
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }

  async listenToKafka(
    topics: string[],
    cb: (payload: any) => Promise<void>
  ): Promise<void> {
    await this.repository.subscribeConsumerToTopics(...topics);
    await this.repository.runConsumer(cb);
  }
}
