import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '@/server/trpc';
import authRouter from './auth';
import dataSourcesRouter from './dataSources';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => ({
      greeting: `hello ${input.text}`,
    })),
  boards: privateProcedure.query(async ({ ctx }) => {
    const boards = await ctx.boardsRepository.getAll();

    return {
      boards,
    };
  }),
  auth: authRouter,
  dataSources: dataSourcesRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;
