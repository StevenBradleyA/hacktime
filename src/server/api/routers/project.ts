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

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
        preview: z.number(),
        userId: z.string(),
        images: z.array(
          z.object({
            link: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { title, text, preview, userId, images } = input;
      // todo add && ctx.session.user.isVerified
      if (ctx.session.user.isAdmin) {
        const newProject = await ctx.prisma.project.create({
          data: { title, text },
        });

        const createdImages = await Promise.all(
          images.map(async (image, i) => {
            const imageType = i === preview ? "PROJECTPREVIEW" : "PROJECT";

            return ctx.prisma.images.create({
              data: {
                link: image.link,
                resourceType: imageType,
                resourceId: newProject.id,
                userId: userId,
              },
            });
          }),
        );

        return {
          newProject,
          createdImages,
        };
      }

      throw new Error("Invalid userId");
    }),
});
