/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { randomUUID } from 'crypto';
import { privateProcedure, router } from '..';

const GetAllByBoardIdSchema = z.object({
  boardId: z.string(),
});

const GetChartDataSchema = z.object({
  chartId: z.string(),
});

const DeleteChartSchema = z.object({
  chartId: z.string(),
});

const ChartSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number(),
  x: z.number(),
  y: z.number(),
});

const AddChartSchema = z.object({
  boardId: z.string(),
  data_source_id: z.string(),
  height: z.number(),
  width: z.number(),
  title: z.string(),
  x: z.number(),
  y: z.number(),
  type: z.union([
    z.literal('bar'),
    z.literal('line'),
    z.literal('pie'),
  ]),
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
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.chartsRepository.deleteChart(input.chartId);
        return {
          success: true,
          chart: res,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  updateChart: privateProcedure
    .input(ChartSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const chart = await ctx.chartsRepository.updateChart({
          id: input.id,
          height: input.height,
          width: input.width,
          x: input.x,
          y: input.y,
        });
        return {
          success: true,
          chart,
        };
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  addChart: privateProcedure
    .input(AddChartSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const chart = await ctx.chartsRepository.addChart({
          boardId: input.boardId,
          data_source_id: input.data_source_id,
          height: input.height,
          width: input.width,
          title: input.title,
          x: input.x,
          y: input.y,
          type: input.type,
          id: randomUUID(),
        });
        return {
          success: true,
          chart,
        };
      } catch (error:any) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }
    }),
  getChartData: privateProcedure
    .input(GetChartDataSchema)
    .query(async ({ ctx, input }) => {
      const user = ctx.user();
      const { chartId } = input;
      await ctx.chartSerializer.buildChart('Deudas2.xlsx');

      const charts = await ctx.dataSourcesRepository.list();
      // TODO: get chart and serialize
      return {
        chartId,
        user,
        charts,
      };
    }),

});

export default chartRouter;
