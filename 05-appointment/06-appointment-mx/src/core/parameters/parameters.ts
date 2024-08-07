export interface IDatabaseConfig {
  host: string;
  port: number;
  entities: any[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  maxQueryExecutionTime: number;
}

export class Parameters {
  static get port() {
    return process.env.PORT ? Number(process.env.PORT) : 3005;
  }

  static get hostname(): string {
    return process.env.HOSTNAME || "localhost";
  }

  static get dbConfig(): IDatabaseConfig {
    return {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      entities: [],
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "root",
      database: process.env.MYSQL_DATABASE || "appointment",
      synchronize: process.env.DB_SYNC === "true" || true,
      logging: process.env.DB_LOGGING === "true" || false,
      poolSize: process.env.DB_POOL_SIZE
        ? Number(process.env.DB_POOL_SIZE)
        : 10,
      maxQueryExecutionTime: process.env.DB_MAX_QUERY_EXECUTION_TIME
        ? Number(process.env.DB_MAX_QUERY_EXECUTION_TIME)
        : 1000,
    };
  }

  static get kafkaConfig() {
    return {
      clientId: process.env.KAFKA_CLIENT_ID || "my-client-id",
      brokers: process.env.KAFKA_BROKERS
        ? process.env.KAFKA_BROKERS.split(",")
        : ["localhost:9092"],
    };
  }

  static get kafkaGroupId() {
    return process.env.KAFKA_GROUP_ID || "my-group-id";
  }

  static get kafkaTopicPE() {
    return process.env.KAFKA_TOPIC_PE || "topic-pe";
  }

  static get kafkaTopicCO() {
    return process.env.KAFKA_TOPIC_CO || "topic-co";
  }

  static get kafkaTopicMX() {
    return process.env.KAFKA_TOPIC_MX || "topic-mx";
  }

  static get kafkaTopicRollout() {
    return process.env.KAFKA_TOPIC_ROLLOUT || "my-topic-rollout";
  }

  static get kafkaTopicStatus() {
    return process.env.KAFKA_TOPIC_STATUS || "topic-status";
  }
}
