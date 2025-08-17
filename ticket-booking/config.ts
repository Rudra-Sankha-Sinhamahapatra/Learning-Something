import dotenv from "dotenv"
dotenv.config()

export const config = {
    jwt: process.env.JWT_SECRET,
    redis: process.env.REDIS_URL
}