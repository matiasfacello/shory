import { userProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  // PUBLIC PROCEDURES -------------------------------- //

  // USER PROCEDURES -------------------------------- //

  get: userProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.subscription.findFirst({
      where: {
        userId: input.userId,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        plans: true,
      },
    });
  }),

  getPlan: userProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.plans.findFirst({
      where: {
        id: input.id,
      },
    });
  }),

  // ADMIN PROCEDURES -------------------------------- //
  // adminTest: adminProcedure.query(() => {
  //   return "User is Admin";
  // }),
});
