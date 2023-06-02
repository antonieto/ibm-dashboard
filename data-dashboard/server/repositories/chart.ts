import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import type { Chart } from '../models';
import { type } from 'os';

export interface IChartRepository {
  getAllByBoardId(boardId: string): Promise<Chart[]>;
  addChart(chart: Chart): Promise<Chart>;
  deleteChart(chartId: string): Promise<{id:string}>;
  updateChart(chart: Pick<Chart, 'id' | 'x' | 'y' | 'width' | 'height'>): Promise<Chart>;
}

const ChartTypeMap = new Map<string, 'BAR_CHART' | 'LINE_CHART' | 'PIE_CHART'>([
  ['bar', 'BAR_CHART'],
  ['line', 'LINE_CHART'],
  ['pie', 'PIE_CHART'],
]);

const ChartTypeMapInverted = new Map<string, 'bar' | 'line' | 'pie'>([
  ['BAR_CHART', 'bar'],
  ['LINE_CHART', 'line'],
  ['PIE_CHART', 'pie'],
]);

export class PrismaChartRepository implements IChartRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllByBoardId(boardId: string): Promise<Chart[]> {
    const fetchedCharts = await this.db.charts.findMany({
      where: { board_id: boardId },
    });
    return fetchedCharts.map((chart) => ({
      id: chart.chart_id,
      boardId: chart.board_id,
      data_source_id: chart.data_source_id,
      height: chart.height,
      width: chart.width,
      title: chart.title,
      x: chart.x_index,
      y: chart.y_index,
      type: ChartTypeMapInverted.get(chart.type) || 'bar',
    }));
  }

  async addChart(chart: Omit<Chart, 'id'>): Promise<Chart> {
    try {
      let chartType: 'BAR_CHART' | 'LINE_CHART' | 'PIE_CHART' = 'BAR_CHART';
      if (ChartTypeMap.has(chart.type)) {
        const mappedType = ChartTypeMap.get(chart.type);
        if (mappedType) {
          chartType = mappedType;
        }
      }

      console.log('chart: ', chart);

      const newChart = await this.db.charts.create({
        data: {
          board_id: chart.boardId,
          data_source_id: chart.data_source_id,
          height: chart.height,
          width: chart.width,
          title: chart.title,
          x_index: chart.x,
          y_index: chart.y,
          type: chartType,
        },
      });
      return {
        id: newChart.chart_id,
        boardId: newChart.board_id,
        data_source_id: newChart.data_source_id,
        height: newChart.height,
        width: newChart.width,
        title: newChart.title,
        x: newChart.x_index,
        y: newChart.y_index,
        type: ChartTypeMapInverted.get(newChart.type) || 'bar',
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create chart',
      });
    }
  }

  async deleteChart(chartId: string): Promise<{id:string}> {
    try {
      await this.db.charts.delete({
        where: {
          chart_id: chartId,
        },
      });
      return {
        id: chartId,
      };
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete chart',
      });
    }
  }

  async updateChart(chart: Pick<Chart, 'id' | 'x' | 'y' | 'width' | 'height'>): Promise<Chart> {
    try {
      const updatedChart = await this.db.charts.update({
        where: {
          chart_id: chart.id,
        },
        data: {
          height: chart.height,
          width: chart.width,
          x_index: chart.x,
          y_index: chart.y,
        },
      });
      return {
        id: updatedChart.chart_id,
        boardId: updatedChart.board_id,
        data_source_id: updatedChart.data_source_id,
        height: updatedChart.height,
        width: updatedChart.width,
        title: updatedChart.title,
        x: updatedChart.x_index,
        y: updatedChart.y_index,
        type: ChartTypeMapInverted.get(updatedChart.type) || 'bar',
      };
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update chart',
      });
    }
  }
}
