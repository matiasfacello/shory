import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { subscriptionRouter } from "./routers/subscription";
import { linkRouter } from "./routers/link";
import { clicksRouter } from "./routers/clicks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  subscription: subscriptionRouter,
  link: linkRouter,
  clicks: clicksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
