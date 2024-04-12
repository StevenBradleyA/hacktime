import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  getByTitle: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const projectData = await ctx.prisma.project.findUnique({
        where: {
          title: input,
        },
      });

      if (projectData) {
        const projectImages = await ctx.prisma.images.findMany({
          where: {
            resourceId: projectData.id,
          },
        });
        return { projectData, projectImages };
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
        link: z.string(),
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
      const { title, text, preview, userId, images, link } = input;
      if (ctx.session.user.isAdmin) {
        const newProject = await ctx.prisma.project.create({
          data: { title, text, link },
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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        title: z.string(),
        text: z.string().optional(),
        link: z.string(),
        preview: z.object({ source: z.string(), index: z.number() }),
        deleteImageIds: z.array(z.string()).optional(),
        images: z
          .array(
            z.object({
              link: z.string(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, text, deleteImageIds, images, userId, preview, link } =
        input;

      if (ctx.session.user.isAdmin) {
        const updatedProject = await ctx.prisma.project.update({
          where: {
            id: id,
          },
          data: { title, text, link },
        });

        await ctx.prisma.images.updateMany({
          where: {
            resourceId: id,
            resourceType: "PROJECTPREVIEW",
          },
          data: {
            resourceType: "PROJECT",
          },
        });

        if (preview.source === "prev") {
          const allExistingImages = await ctx.prisma.images.findMany({
            where: {
              resourceId: id,
            },
          });
          await Promise.all(
            allExistingImages.map(async (image, i) => {
              if (i === preview.index) {
                return ctx.prisma.images.update({
                  where: {
                    id: image.id,
                  },
                  data: {
                    resourceType: "PROJECTPREVIEW",
                  },
                });
              }
              return image;
            }),
          );
        }

        if (images && images.length > 0) {
          await Promise.all(
            images.map(async (image, i) => {
              const imageType =
                preview.source === "new" && preview.index === i
                  ? "PROJECTPREVIEW"
                  : "PROJECT";

              return ctx.prisma.images.create({
                data: {
                  link: image.link,
                  resourceType: imageType,
                  resourceId: id,
                  userId: userId,
                },
              });
            }),
          );
        }
        if (deleteImageIds && deleteImageIds.length > 0) {
          const images = await ctx.prisma.images.findMany({
            where: {
              id: { in: deleteImageIds },
            },
          });
          const removeFilePromises = images.map(async (image) => {
            try {
              await removeFileFromS3(image.link);
            } catch (err) {
              console.error(`Failed to remove file from S3: `, err);
              throw new Error(`Failed to remove file from S3: `);
            }
          });

          await Promise.all(removeFilePromises);

          await ctx.prisma.images.deleteMany({
            where: {
              id: { in: deleteImageIds },
            },
          });
        }

        return updatedProject;
      }

      throw new Error("Invalid userId");
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        imageIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, imageIds } = input;
      if (ctx.session.user.isAdmin) {
        if (imageIds.length > 0) {
          const images = await ctx.prisma.images.findMany({
            where: {
              id: { in: imageIds },
            },
          });
          const removeFilePromises = images.map(async (image) => {
            try {
              await removeFileFromS3(image.link);
            } catch (err) {
              console.error(`Failed to remove file from S3: `, err);
              throw new Error(`Failed to remove file from S3: `);
            }
          });

          await Promise.all(removeFilePromises);

          await ctx.prisma.images.deleteMany({
            where: {
              id: { in: imageIds },
            },
          });
        }

        await ctx.prisma.project.delete({ where: { id: id } });

        return "Successfully deleted";
      }

      throw new Error("Invalid userId");
    }),
});
