import { ErrorBase } from "../../../core/errors/error-base";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class SaveAppointmentApplication {
  constructor(private repository: AppointmentRepository) {}

  async handle(appointment: Appointment): Promise<Appointment | ErrorBase> {
    const result = await this.repository.saveToDatabase(appointment);

    if (result.isErr()) {
      return result.error;
    }

    return appointment;
  }
}
