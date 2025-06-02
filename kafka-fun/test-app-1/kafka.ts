import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});

export const consumer = kafka.consumer({
  groupId: "my-app3",
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  rebalanceTimeout: 60000,
  maxWaitTimeInMs: 5000
});

export async function connectProducer() {
  try {
    await producer.connect();
    console.log('Producer connected');
  } catch (error) {
    console.error('Failed to connect producer:', error);
  }
}

export async function connectConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "test-app-1", fromBeginning: true });
    console.log('Consumer connected and subscribed');
  } catch (error) {
    console.error('Failed to connect consumer:', error);
  }
}

export async function disconnectProducer() {
  try {
    await producer.disconnect();
    console.log('Producer disconnected');
  } catch (error) {
    console.error('Failed to disconnect producer:', error);
  }
}

export async function disconnectConsumer() {
  try {
    await consumer.disconnect();
    console.log('Consumer disconnected');
  } catch (error) {
    console.error('Failed to disconnect consumer:', error);
  }
}
