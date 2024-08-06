import { ErrorBase } from "../../../core/errors/error-base";
import { Parameters } from "../../../core/parameters/parameters";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class SaveAppointmentApplication {
  constructor(private repository: AppointmentRepository) {}

  async handle(appointment: Appointment): Promise<Appointment | ErrorBase> {
    const result = await this.repository.saveToDatabase(appointment);

    if (result.isErr()) {
      return result.error;
    }

    const topics: Record<string, string> = {
      PE: Parameters.kafkaTopicPE,
      CO: Parameters.kafkaTopicCO,
      MX: Parameters.kafkaTopicMX,
    };

    await this.repository.saveToKafka(
      appointment,
      topics[appointment.properties.country]
    );

    return appointment;
  }
}
