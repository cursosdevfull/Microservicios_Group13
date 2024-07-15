const { kafka } = require("./client");
const readline = require("readline");

const { Partitioners } = require("kafkajs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [message, partition] = line.split(" ");
    console.log({
      topic: "updates-client",
      messages: [
        {
          partition: +partition,
          key: "testing update" + new Date().getTime(),
          value: JSON.stringify({ message, numPartition: partition }),
        },
      ],
    });

    await producer.send({
      topic: "updates-client",
      messages: [
        {
          partition: +partition,
          key: "testing update" + new Date().getTime(),
          value: JSON.stringify({ message, numPartition: partition }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
})();
