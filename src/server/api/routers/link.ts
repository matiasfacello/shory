import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const linkRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.sLink.findMany();
  }),

  get: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.findFirst({
      where: {
        slug: input.slug,
      },
    });
  }),

  getFromUser: publicProcedure.input(z.object({ user: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.findMany({
      where: {
        userId: input.user,
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
});
