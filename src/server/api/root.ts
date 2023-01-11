import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { linkRouter } from "./routers/link";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  link: linkRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
