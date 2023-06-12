/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { randomUUID } from 'crypto';
import { ChartWithData } from '@/server/models';
import { privateProcedure, router } from '..';

const GetAllByBoardIdSchema = z.object({
  boardId: z.string(),
});

// Disabling eslint, we are going to use this schema eventually
// eslint-disable-next-line
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
  columnSettings: z.object({
    indexColumn: z.number(),
    categoryColumns: z.array(z.number()),
  }),
});

const chartRouter = router({
  getCharts: privateProcedure
    .input(GetAllByBoardIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const charts = await ctx.chartsRepository.getAllByBoardId(input.boardId);
        const chartsWithData = await Promise.all(charts.map(async (chart) => {
          const settings = await ctx.chartsRepository.getChartSettingsByChartId(chart.id);
          if (settings === null) {
            throw new Error('Chart settings were not found');
          }
          const serializedData = await ctx.chartSerializer.buildChartData(chart, settings);
          return {
            ...chart,
            ...serializedData,
          };
        }));
        return chartsWithData;
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

        const settings = await ctx.chartsRepository.setChartSettings(chart.id, {
          xAxisColumn: input.columnSettings.indexColumn,
          yAxisColumns: input.columnSettings.categoryColumns,
        });

        return {
          success: true,
          chart,
          settings,
        };
      } catch (error:any) {
        console.log(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      }
    }),
  getChartData: privateProcedure
    .input(GetChartDataSchema)
    .query<ChartWithData>(async ({ ctx, input }) => {
      try {
        const chartModel = await ctx.chartsRepository.getById(input.chartId);
        if (!chartModel) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Chart data was not found' });
        }
        const dataSource = await ctx.dataSourcesRepository.getById(chartModel.data_source_id);
        if (!dataSource) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Data source was not found' });
        }
        const settings = await ctx.chartsRepository.getChartSettingsByChartId(chartModel.id);
        if (settings === null) {
          throw new Error('Chart settings were not found');
        }
        const serializedData = await ctx.chartSerializer.buildChartData(chartModel, settings);

        return {
          ...chartModel,
          ...serializedData,
        };
      } catch (e) {
        console.log('Error in getChartData: ', e);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
});

export default chartRouter;
