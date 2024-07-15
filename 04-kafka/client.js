const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "client-kafka-01",
  brokers: ["localhost:9092"],
});
