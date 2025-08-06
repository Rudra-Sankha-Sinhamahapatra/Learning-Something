import { Client } from 'pg';
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const db = new Client({
 connectionString: DATABASE_URL,
})

await db.connect();