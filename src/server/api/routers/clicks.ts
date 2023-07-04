import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure, userProcedure } from "../trpc";

export const clicksRouter = createTRPCRouter({
  // PUBLIC PROCEDURES -------------------------------- //
  add: publicProcedure
    .input(
      z.object({
        linkId: z.number(),
        slug: z.string().min(1),
        url: z.string().min(1),
        country: z.string().nullable(),
        region: z.string().nullable(),
        city: z.string().nullable(),
        eurozone: z.string().nullable(),
        timezone: z.string().nullable(),
        area: z.number().nullable(),
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
