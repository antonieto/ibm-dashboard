import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';
import authRouter from './auth';
import dataSourcesRouter from './dataSources';
import boardRouter from './boards';
import chartsRouter from './charts';

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
  charts: chartsRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;
