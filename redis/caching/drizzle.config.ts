import type { Config } from "drizzle-kit";
import { config } from "./config";

export default {
    schema: "./db/schema/schema.ts",
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.db as string,
    }
} satisfies Config;