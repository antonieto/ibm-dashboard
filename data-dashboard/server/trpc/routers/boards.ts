import { z } from 'zod';
import { privateProcedure, router } from '..';

const CreateBoardSchema = z.object({
  title: z.string(),
});

const boardRouter = router({
  getBoards: privateProcedure.query(async ({ ctx }) => {
    ctx.cacheService.set('test', 'el testeoo');
    const res = await ctx.cacheService.get('test');
    console.log({ res });
    const user = await ctx.user();
    const boards = await ctx.boardsRepository.getAllByUserId(user.id);
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
