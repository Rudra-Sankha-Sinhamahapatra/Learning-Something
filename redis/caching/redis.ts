import { createClient } from "redis";
import { config } from "./config";

const redisClient = createClient({
    url: config.redis as string,
});

async function connectRedis() {
    await redisClient.connect();
    console.log('Redis connected');
}
redisClient.on('error', (err) => {
    console.log('Redis error', err);
});
connectRedis();

export default redisClient;