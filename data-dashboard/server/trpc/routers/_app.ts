import { z } from 'zod';
import { service } from '@/server/init';
import { publicProcedure, router } from '@/server/trpc';
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
  boards: publicProcedure.query(async () => {
    const boards = await service.boardsRepository.getAll();
    return {
      boards,
    };
  }),
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter
