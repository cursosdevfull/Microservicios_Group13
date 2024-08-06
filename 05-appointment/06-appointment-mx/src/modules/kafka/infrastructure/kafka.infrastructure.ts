import { EachMessagePayload } from "kafkajs";

import { BrokerBootstrap } from "../../../bootstrap/broker.bootstrap";
import {
  KafkaRepository,
  TMessage,
} from "../domain/repositories/kafka.repository";

export class KafkaInfrastructure implements KafkaRepository {
  async subscribeConsumerToTopics(...topics: string[]): Promise<void> {
    console.log("Subscribing to topics", topics);
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });
  }

  async runConsumer(
    cb: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void> {
    console.log("Running consumer");
    const consumer = BrokerBootstrap.getConsumer();
    await consumer.run({
      eachMessage: cb,
    });
  }

  async sentMessage(
    topic: string,
    key: string,
    message: TMessage,
    partition: number
  ): Promise<void> {
    const producer = BrokerBootstrap.getProducer();
    await producer.send({
      topic,
      messages: [
        {
          partition,
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
