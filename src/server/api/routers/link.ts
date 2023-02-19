import { createTRPCRouter, publicProcedure, userProcedure /*adminProcedure*/ } from "../trpc";
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

  // USER PROCEDURES -------------------------------- //

  count: userProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.count({
      where: {
        userId: input.userId,
      },
    });
  }),

  getFromUser: userProcedure.input(z.object({ user: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.sLink.findMany({
      where: {
        userId: input.user,
      },
      orderBy: {
        slug: "asc",
      },
    });
  }),

  add: userProcedure
    .input(
      z.object({
        slug: z.string().min(6).max(32),
        url: z.string().min(1),
        userId: z.string(),
        tags: z.string().nullable(),
        utm_source: z.string().nullable(),
        utm_campaign: z.string().nullable(),
        utm_medium: z.string().nullable(),
        utm_term: z.string().nullable(),
        utm_content: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.sLink.create({
        data: {
          slug: input.slug,
          url: input.url,
          tags: input.tags,
          userId: input.userId,
          utm_source: input.utm_source,
          utm_campaign: input.utm_campaign,
          utm_medium: input.utm_medium,
          utm_term: input.utm_term,
          utm_content: input.utm_content,
        },
      });
      return link;
    }),

  update: userProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z.string().min(6).max(32),
        url: z.string().min(1),
        userId: z.string(),
        tags: z.string().nullable(),
        utm_source: z.string().nullable(),
        utm_campaign: z.string().nullable(),
        utm_medium: z.string().nullable(),
        utm_term: z.string().nullable(),
        utm_content: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.sLink.updateMany({
        where: {
          id: input.id,
          userId: input.userId,
        },
        data: {
          slug: input.slug,
          url: input.url,
          tags: input.tags,
          utm_source: input.utm_source,
          utm_campaign: input.utm_campaign,
          utm_medium: input.utm_medium,
          utm_term: input.utm_term,
          utm_content: input.utm_content,
        },
      });
      return link;
    }),

  delete: userProcedure.input(z.object({ slug: z.string(), user: z.string() })).mutation(async ({ ctx, input }) => {
    const link = await ctx.prisma.sLink.deleteMany({
      where: {
        slug: input.slug,
        userId: input.user,
      },
    });
    return link;
  }),

  // ADMIN PROCEDURES -------------------------------- //

  // getAll: adminProcedure.query(({ ctx }) => {
  //   return ctx.prisma.sLink.findMany();
  // }),
});
