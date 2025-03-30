import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import type { AppRouter } from "./router";

// Re-export the type for use in client
export type { AppRouter };

const handler = (req:Request) => 
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({})
    });

export { handler as GET, handler as POST };