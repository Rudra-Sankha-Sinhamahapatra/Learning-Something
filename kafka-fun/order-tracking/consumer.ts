import { kafka } from "./kafka";
import { orderStatus } from "./orderStatus";

export const consumer = kafka.consumer({ 
    groupId: "order-tracker-group",
    retry: {
        retries: 5,
        initialRetryTime: 100,
        maxRetryTime: 30000
    }
});

(async() => {
    try {
        console.log('Connecting consumer...');
        await consumer.connect();
        console.log('Consumer connected, subscribing to topic...');
        await consumer.subscribe({ topic: 'order-events', fromBeginning: true });
        console.log('Consumer ready, processing messages...');
        await consumer.run({
           eachMessage: async ({ message }) => {
            const { orderId, status, timestamp } = JSON.parse(message.value!.toString());
            orderStatus.set(orderId, {status, timestamp});
            console.log(`Order ${orderId} -> ${status} (${timestamp})`);
           },
        });
    } catch (error) {
        console.error('Consumer error:', error);
        setTimeout(() => process.exit(1), 5000);
    }
})();

