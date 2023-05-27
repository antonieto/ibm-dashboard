import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { privateProcedure, router } from '..';

const GetAllByBoardIdSchema = z.object({
  boardId: z.string(),
});

const DeleteChartSchema = z.object({
  chartId: z.string(),
});

const ChartSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  data_source_id: z.string(),
  height: z.number(),
  width: z.number(),
  title: z.string(),
  x: z.number(),
  y: z.number(),
  type: z.string(),
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
  deleteChart: privateProcedure
    .input(DeleteChartSchema)
    .query(async ({ ctx, input }) => {
      try {
        await ctx.chartsRepository.deleteChart(input.chartId);
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  updateChart: privateProcedure
    .input(ChartSchema)
    .query(async ({ ctx, input }) => {
      try {
        const chartType: 'bar' | 'line' | 'pie' = input.type as 'bar' | 'line' | 'pie';
        const chart = await ctx.chartsRepository.updateChart({
          id: input.id,
          boardId: input.boardId,
          data_source_id: input.data_source_id,
          height: input.height,
          width: input.width,
          title: input.title,
          x: input.x,
          y: input.y,
          type: chartType,
        });
        return {
          success: true,
          chart,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  addChart: privateProcedure
    .input(ChartSchema)
    .query(async ({ ctx, input }) => {
      try {
        const chartType: 'bar' | 'line' | 'pie' = input.type as 'bar' | 'line' | 'pie';
        const chart = await ctx.chartsRepository.addChart({
          id: input.id,
          boardId: input.boardId,
          data_source_id: input.data_source_id,
          height: input.height,
          width: input.width,
          title: input.title,
          x: input.x,
          y: input.y,
          type: chartType,
        });
        return {
          success: true,
          chart,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

});

export default chartRouter;
