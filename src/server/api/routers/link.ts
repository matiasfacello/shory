import { createTRPCRouter, publicProcedure, userProcedure, adminProcedure } from "../trpc";
import { z } from "zod";

export const linkRouter = createTRPCRouter({
  // PUBLIC PROCEDURES -------------------------------- //
  check: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.count({
      where: {
        slug: input.slug,
      },
    });
  }),

  get: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.findFirst({
      where: {
        slug: input.slug,
      },
    });
  }),

  add: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        slug: z.string().min(1).max(32),
        url: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.sLink.create({
        data: input,
      });
      return post;
    }),

  // USER PROCEDURES -------------------------------- //

  getFromUser: userProcedure.input(z.object({ user: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.findMany({
      where: {
        userId: input.user,
      },
    });
  }),

  // ADMIN PROCEDURES -------------------------------- //

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.sLink.findMany();
  }),
});
