import { db } from "./db";

export async function getWebsiteStats(website: string) {
    const res = await db.query(`
           SELECT 
               date_trunc('hour', time) + 
               INTERVAL '5 minute' * FLOOR(EXTRACT(minute FROM time) / 5) AS bucket,
               COUNT(*) AS total_count,
               COUNT(*) FILTER (WHERE TRIM(status) = 'up') AS up_count,
               COUNT(*) FILTER (WHERE TRIM(status) = 'down') AS down_count,
               string_agg(DISTINCT status, ', ') AS statuses_found
           FROM website_uptime
           WHERE website = $1
           GROUP BY bucket
           ORDER BY bucket
        `,[website]);

        return res.rows;
}