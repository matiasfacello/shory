import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  // PUBLIC PROCEDURES -------------------------------- //
  check: publicProcedure.input(z.object({ email: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.count({
      where: {
        email: input.email,
      },
    });
  }),

  checkIfAdmin: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.count({
      where: {
        id: input.id,
        role: "Admin",
      },
    });
  }),

  get: publicProcedure.input(z.object({ email: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });
  }),

  // USER PROCEDURES -------------------------------- //

  // ADMIN PROCEDURES -------------------------------- //
  // adminTest: adminProcedure.query(() => {
  //   return "User is Admin";
  // }),
});
