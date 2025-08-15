import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'order-tracker',
    brokers: ["localhost:9092"],
    logLevel: logLevel.ERROR && logLevel.WARN, 
})