import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '..';


const CreateBoardSchema = z.object({
  title: z.string(),
});


const boardRouter = router({
  getBoards: publicProcedure.query(async ({ ctx }) => {
    const boards = await ctx.boardsRepository.getAll();
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
        title: title,
        ownerId: user.id,
      });
      return {
        board,
      };
    }
  ),
});

export default boardRouter;
