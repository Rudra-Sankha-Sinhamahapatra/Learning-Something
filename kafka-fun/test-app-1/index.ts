import { producer, consumer, connectProducer, connectConsumer, disconnectProducer, disconnectConsumer } from "./kafka"
import { prisma } from "./prisma";
import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/", async(req: Request, res: Response) => {
  const { message } = req.body;
  try {
    await producer.send({
      topic: "test-app-1",
      messages: [{
        value: message || "no message"
      }]
    });
    res.status(200).json({ status: "Message sent", message });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

async function setupKafka() {
  await connectProducer();
  await connectConsumer();
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        await prisma.chat.create({
          data: {
            offset: message.offset,
            message: message?.value?.toString() || "",
            topic: topic,
            partition: partition.toString()
          }
        });
      } catch (error) {
        console.error('Failed to process message:', error);
      }
    },
  });
}

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

async function shutdown() {
  console.log('Shutting down...');
  server.close(async () => {
    await disconnectConsumer();
    await disconnectProducer();
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

setupKafka().catch(console.error);