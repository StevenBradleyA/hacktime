import { compare } from "bcryptjs";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  grantAdmin: publicProcedure
    .input(z.string())
    .mutation(async ({ input: hashPass, ctx }) => {
      const correct = await compare(env.POGWORD, hashPass);
      if (ctx.session === null) {
        throw new Error("Not Signed In");
      }
      if (correct) {
        const updatedUser = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            isAdmin: true,
          },
        });
        return updatedUser ? "Success" : "Error";
      } else {
        return "Incorrect";
      }
    }),
  grantCustomer: publicProcedure
    .input(z.string())
    .mutation(async ({ input: hashPass, ctx }) => {
      const correct = await compare(env.CUSTOMERWORD, hashPass);
      if (ctx.session === null) {
        throw new Error("Not Signed In");
      }
      if (correct) {
        const updatedUser = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            isCustomer: true,
          },
        });
        return updatedUser ? "Success" : "Error";
      } else {
        return "Incorrect";
      }
    }),
});
