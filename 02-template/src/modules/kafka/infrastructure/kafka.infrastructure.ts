import { EachMessagePayload } from "kafkajs";

import { BrokerBootstrap } from "../../../bootstrap/broker.bootstrap";
import { KafkaRepository } from "../domain/repositories/kafka.repository";

export class KafkaInfrastructure implements KafkaRepository {
  async subscribeConsumerToTopics(...topics: string[]) {
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });
  }

  async runConsumer(cb: (payload: EachMessagePayload) => Promise<void>) {
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.run({
      eachMessage: cb,
    });
  }

  async sentMesssage(
    topic: string,
    key: string,
    message: Record<string, string | number | boolean | object>,
    partition: number
  ) {
    const producer = BrokerBootstrap.getProducer();
    await producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(message),
          partition,
        },
      ],
    });
  }
}
