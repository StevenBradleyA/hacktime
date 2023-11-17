import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const requestRouter = createTRPCRouter({
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.request.findMany();
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: publicProcedure
    .input(
      z.object({
        budget: z.string(),
        email: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { budget, email, text } = input;
      const newRequest = await ctx.prisma.request.create({
        data: { budget, email, text },
      });

      return newRequest;
    }),

  // want to create a route that returns true or false depending on if the secret password matches
  // if it does we will show all requests will be saved in cookies

  // add delete request route
});
