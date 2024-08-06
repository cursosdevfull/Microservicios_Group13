import { EachMessagePayload } from "kafkajs";

import { BrokerBootstrap } from "../../../bootstrap/broker.bootstrap";
import { Parameters } from "../../../core/parameters/parameters";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class ListenAppointmentApplication {
  constructor(private repository: AppointmentRepository) {}

  async run() {
    await this.repository.listenToKafka(
      [Parameters.kafkaTopicStatus],
      this.task.bind(this)
    );
  }

  async task(payload: EachMessagePayload) {
    console.log(`Message: ${payload.message.value.toString()}`);
    console.log(`Partition: ${payload.partition.toString()}`);
    console.log(`Offset: ${payload.message.offset.toString()}`);
    console.log(`Key: ${payload.message.key.toString()}`);
    console.log(`Topic: ${payload.topic}`);

    const appointmentData = JSON.parse(payload.message.value.toString());
    const { appointmentId, status } = appointmentData;

    const appointment = await this.repository.findById(appointmentId);
    appointment.update(status);

    await this.repository.saveToDatabase(appointment);

    const consumer = BrokerBootstrap.getConsumer();

    await consumer.commitOffsets([
      {
        topic: payload.topic,
        partition: payload.partition,
        offset: payload.message.offset + 1,
      },
    ]);
  }
}
