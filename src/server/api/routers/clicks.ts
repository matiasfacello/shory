import { createTRPCRouter, publicProcedure, userProcedure, adminProcedure } from "../trpc";
import { z } from "zod";

export const clicksRouter = createTRPCRouter({
  // PUBLIC PROCEDURES -------------------------------- //
  add: publicProcedure
    .input(
      z.object({
        linkId: z.number(),
        slug: z.string().min(1),
        url: z.string().min(1),
        ip: z.string().nullable(),
        geo: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.sLinkClicks.create({
        data: input,
      });
      return post;
    }),

  // USER PROCEDURES -------------------------------- //

  getLinkFromUser: userProcedure.input(z.object({ linkId: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.sLinkClicks.findMany({
      where: {
        linkId: input.linkId,
      },
    });
  }),

  // ADMIN PROCEDURES -------------------------------- //

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.sLink.findMany();
  }),
});
