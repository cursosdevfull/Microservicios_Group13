import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

import { Parameters } from "../core/parameters/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class BrokerBootstrap implements IBootstrap {
  private static client: Kafka;
  private static consumer: Consumer;
  private static producer: Producer;

  async initialize(): Promise<void> {
    BrokerBootstrap.client = new Kafka({
      clientId: Parameters.kafkaConfig.clientId,
      brokers: Parameters.kafkaConfig.brokers,
    });

    const admin = BrokerBootstrap.client.admin();
    await admin.createTopics({
      topics: [
        {
          topic: Parameters.kafkaTopicPE,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicCO,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicMX,
          numPartitions: 1,
        },
        {
          topic: Parameters.kafkaTopicStatus,
          numPartitions: 1,
        },
      ],
    });
    BrokerBootstrap.consumer = BrokerBootstrap.client.consumer({
      groupId: Parameters.kafkaGroupId,
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
