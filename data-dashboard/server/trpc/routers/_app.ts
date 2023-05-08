import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '@/server/trpc';
import authRouter from './auth';

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
  boards: publicProcedure.query(async ({ ctx }) => {
    const boards = await ctx.boardsRepository.getAll();

    return {
      boards,
    };
  }),
  secretoDeAmor: privateProcedure.query(() => { 'aloh'; }),
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
