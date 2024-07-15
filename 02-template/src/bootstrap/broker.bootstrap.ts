import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

import { IBootstrap } from "./bootstrap.interface";

export class BrokerBootstrap implements IBootstrap {
  private static client: Kafka;
  private static consumer: Consumer;
  private static producer: Producer;

  async initialize(): Promise<void> {
    BrokerBootstrap.client = new Kafka({
      clientId: "broker",
      brokers: ["localhost:9092"],
    });

    BrokerBootstrap.consumer = BrokerBootstrap.client.consumer({
      groupId: "test-group",
    });
    BrokerBootstrap.producer = BrokerBootstrap.client.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await BrokerBootstrap.producer.connect();

    return Promise.resolve();
  }

  static getClient(): Kafka {
    return BrokerBootstrap.client;
  }

  static getConsumer(): Consumer {
    return BrokerBootstrap.consumer;
  }

  static getProducer(): Producer {
    return BrokerBootstrap.producer;
  }
}
