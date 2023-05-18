import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '@/server/trpc';
import authRouter from './auth';
import dataSourcesRouter from './dataSources';
import boardRouter from './boards';

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
  boards: boardRouter,
  auth: authRouter,
  dataSources: dataSourcesRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;
