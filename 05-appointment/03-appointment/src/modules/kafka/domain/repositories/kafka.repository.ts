import { EachMessagePayload } from "kafkajs";

export type TMessage = string | number | object | boolean;

export type KafkaRepository = {
  subscribeConsumerToTopics(...topics: string[]): Promise<void>;
  runConsumer(
    cb: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void>;
  sentMessage(
    topic: string,
    key: string,
    message: TMessage,
    partition: number
  ): Promise<void>;
};
