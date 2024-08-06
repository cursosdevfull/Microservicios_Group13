import { EachMessagePayload } from "kafkajs";

import { BrokerBootstrap } from "../../../bootstrap/broker.bootstrap";
import { Parameters } from "../../../core/parameters/parameters";
import { KafkaRepository } from "../domain/repositories/kafka.repository";
import { KafkaInfrastructure } from "../infrastructure/kafka.infrastructure";

export class KafkaApplication {
  private readonly repository: KafkaRepository = new KafkaInfrastructure();

  async run() {
    console.log("Running Kafka Application");
    await this.repository.subscribeConsumerToTopics(Parameters.kafkaTopicMX);
    await this.repository.runConsumer(this.task.bind(this));
  }

  async task(payload: EachMessagePayload) {
    console.log("New message received");
    console.log(`Message: ${payload.message.value.toString()}`);
    console.log(`Partition: ${payload.partition.toString()}`);
    console.log(`Offset: ${payload.message.offset.toString()}`);
    console.log(`Key: ${payload.message.key.toString()}`);
    console.log(`Topic: ${payload.topic}`);

    const appointment = JSON.parse(payload.message.value.toString());
    const consumer = BrokerBootstrap.getConsumer();

    await consumer.commitOffsets([
      {
        topic: payload.topic,
        partition: payload.partition,
        offset: payload.message.offset + 1,
      },
    ]);

    const newStatus = Math.random() > 0.5 ? "COMPLETED" : "CANCELLED";

    await this.repository.sentMessage(
      Parameters.kafkaTopicStatus,
      "appoinment",
      { appointmentId: appointment.appointmentId, status: newStatus },
      0
    );
  }
}
