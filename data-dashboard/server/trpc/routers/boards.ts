import { z } from 'zod';
import { privateProcedure, router } from '..';

const CreateBoardSchema = z.object({
  title: z.string(),
});

const boardRouter = router({
  getBoards: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.user();
    const boards = await ctx.boardsRepository.getAll(user);
    return {
      boards,
    };
  }),

  createBoard: privateProcedure
    .input(
      CreateBoardSchema,
    )
    .mutation(async ({ ctx, input }) => {
      const { title } = input;
      const user = await ctx.user();
      const board = await ctx.boardsRepository.create({
        title,
        ownerId: user.id,
      });
      return {
        board,
      };
    }),
});

export default boardRouter;
