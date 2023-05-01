import { z } from 'zod';
import { service } from '..';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => ({
      greeting: `hello ${input.text}`,
    })),
  boards: procedure.query(async () => {
    const boards = service.boardsRepository.getAll();
    return {
      boards,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter
