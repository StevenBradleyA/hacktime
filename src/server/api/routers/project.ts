import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { title, text } = input;
      const newProject = await ctx.prisma.project.create({
        data: { title, text },
      });
      return newProject;
    }),
});
