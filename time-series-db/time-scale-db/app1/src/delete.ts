import { db } from "./db";

export async function deleteWebsiteData(website: string) {
    const res = await db.query(`
        DELETE FROM website_uptime 
        WHERE website = $1
    `, [website]);

    console.log(`[LOG] Deleted ${res.rowCount} records for ${website}`);
    return { deletedCount: res.rowCount, website };
}