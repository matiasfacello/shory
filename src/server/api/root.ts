import { clicksRouter } from "~/server/api/routers/clicks";
import { linkRouter } from "~/server/api/routers/link";
import { subscriptionRouter } from "~/server/api/routers/subscription";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

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
