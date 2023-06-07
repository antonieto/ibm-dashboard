import { z } from 'zod';
import { privateProcedure, router } from '..';

const CreateBoardSchema = z.object({
  title: z.string(),
});

const UpdatePreviewImgSchema = z.object({
  boardId: z.string(),
  previewImg: z.string(),
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
  updatePreviewImg: privateProcedure
    .input(UpdatePreviewImgSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, previewImg } = input;
      const board = await ctx.boardsRepository.update({
        boardId,
        previewImg,
      });
      return {
        board,
      };
    }),
});

export default boardRouter;
