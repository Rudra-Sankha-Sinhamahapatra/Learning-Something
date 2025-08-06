import { db } from "./db";
import type { WebsiteStatus } from "./types";

export async function insertUptime(params: WebsiteStatus) {
    const trimmedStatus = params.status.trim();
    await db.query(
        "INSERT INTO website_uptime (time,website,status) VALUES (NOW(), $1, $2)",
        [params.website, trimmedStatus]
    );

    console.log(`[LOG] ${params.website} is ${trimmedStatus}`);
}