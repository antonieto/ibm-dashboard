import { publicProcedure, router } from '..';

const boardRouter = router({
  getBoards: publicProcedure.query(async ({ ctx }) => {
    const boards = await ctx.boardsRepository.getAll();
    return {
      boards,
    };
  }),
});

export default boardRouter;
