import { z } from 'zod';
import { router, publicProcedure } from '..';

const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ctx.boardsRepository.getAll();
      console.log('authRouter.login', ctx.help);
      console.log(input);

      return {
        message: 'Working on it',
      };
    }),
});

export default authRouter;
