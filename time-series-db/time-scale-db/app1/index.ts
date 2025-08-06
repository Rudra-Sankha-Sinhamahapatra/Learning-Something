import { serve } from "bun";
import { insertUptime } from "./src/insert";
import { getWebsiteStats } from "./src/query";
import { prisma } from "./src/prisma";
import { deleteWebsiteData } from "./src/delete";

serve({
    port: 3000,
    async fetch(req) {
        console.log(`[LOG] ${req.method} ${req.url}`);
        console.log("Server started on port 3000");

        const { pathname, searchParams } = new URL(req.url);

        if (pathname === "/insert") {
            const website = searchParams.get('website');
            const status = searchParams.get("status");
            if (!website || !status) {
                return new Response('Missing params', { status: 400 });
            }
            await insertUptime({ website, status: status as 'up' | 'down' });
            return new Response('Inserted!');
        }

        if(pathname === '/stats') {
            const website = searchParams.get('website');
             if (!website) return new Response('Missing website', { status: 400 });

             const stats = await getWebsiteStats(website);
             return new Response(JSON.stringify(stats), {
                headers: {'Content-Type': 'application/json'},
             });
        }

        if (pathname === '/delete') {
            const website = searchParams.get('website');
            if (!website) return new Response('Missing website', { status: 400 });

            const result = await deleteWebsiteData(website);
            return new Response(JSON.stringify(result), {
                headers: {'Content-Type': 'application/json'},
            });
        }

        if (pathname === '/user') {
      const email = searchParams.get('email');
      const name = searchParams.get('name');
      if (!email || !name) return new Response('Missing data', { status: 400 });

      const user = await prisma.user.create({
        data: { email, name },
      });
      return new Response(JSON.stringify(user));
    }

    return new Response('Not Found', { status: 404 });
    },
})