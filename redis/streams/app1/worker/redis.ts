import { createClient } from "redis";
import { REDIS_URL } from "./config";

export const client = createClient({ url: REDIS_URL });