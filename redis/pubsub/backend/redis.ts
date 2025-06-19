import { config } from "./config";
import redis from "redis"

if(!config.redisUrl) {
    throw new Error("No redis url provided on env");
}

export const redisPublisher = redis.createClient({
    url: config.redisUrl,
})

export const redisSubscriber = redis.createClient({
    url: config.redisUrl,
})

export async function connectRedis() {
    try {
        await redisPublisher.connect();
        await redisSubscriber.connect();
        console.log('Successfully connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        process.exit(1);
    }
}

redisPublisher.on('error', (err) => console.error('Redis Publisher Error:', err));
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));

