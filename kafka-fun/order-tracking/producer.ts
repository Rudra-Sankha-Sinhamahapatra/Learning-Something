import { kafka } from "./kafka";
import type { Event } from "./types";
import { Partitioners } from "kafkajs";

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});

(async() => {
    try {
        await producer.connect();
    } catch (error) {
        console.error('Producer connection error:', error);
    }
})();

export const sendEvent = async (e: Event) => {
    await producer.send({
        topic: 'order-events',
        messages: [{key: e.orderId, value: JSON.stringify(e)}]
    });
};
