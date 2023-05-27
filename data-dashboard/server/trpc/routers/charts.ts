import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { privateProcedure, router } from '..';

const GetAllByBoardIdSchema = z.object({
  boardId: z.string(),
});

const chartRouter = router({
  getCharts: privateProcedure
    .input(GetAllByBoardIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const charts = await ctx.chartsRepository.getAllByBoardId(input.boardId);
        return {
          charts,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
});

export default chartRouter;
