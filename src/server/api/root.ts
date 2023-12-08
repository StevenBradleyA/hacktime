import { requestRouter } from "~/server/api/routers/request";
import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { imageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  request: requestRouter,
  project: projectRouter,
  user: userRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
