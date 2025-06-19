export const config = {
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    port: process.env.PORT || 3000,
}