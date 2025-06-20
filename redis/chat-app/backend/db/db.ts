import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import postgres from "postgres";
import * as schema from "./schema/schema";

const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, {schema});

// Test database connection
export const testDatabaseConnection = async (): Promise<void> => {
    try {
        console.log('🔌 Attempting to connect to database...');
        await client`SELECT NOW()`;
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
};

export { client };