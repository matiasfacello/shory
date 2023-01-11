import { createTRPCRouter } from "./trpc";
import { linkRouter } from "./routers/link";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
