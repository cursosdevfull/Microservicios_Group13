const { kafka } = require("./client");
const groupId = process.argv[2];

(async () => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  await consumer.subscribe({ topics: ["updates-client"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${groupId}: [${topic}]: PARTITION: ${partition}`,
        message.value.toString()
      );
    },
  });
})();
