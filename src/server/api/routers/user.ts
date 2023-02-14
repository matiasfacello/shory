import { userProcedure, createTRPCRouter, publicProcedure } from "../trpc";
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

  checkName: publicProcedure.input(z.object({ name: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.count({
      where: {
        name: input.name,
      },
    });
  }),

  checkTime: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.userNameChanges.count({
      where: {
        userId: input.id,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
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

  changeName: userProcedure
    .input(
      z.object({
        name: z.string().min(6).max(32),
        oldName: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
      await ctx.prisma.userNameChanges.create({
        data: {
          userId: input.id,
          oldName: input.oldName,
          newName: input.name,
        },
      });
      return user;
    }),

  delete: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
      return user;
    }),

  // ADMIN PROCEDURES -------------------------------- //
  // adminTest: adminProcedure.query(() => {
  //   return "User is Admin";
  // }),
});
