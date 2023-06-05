export type Chart = {
  id: string;
  boardId: string;
  data_source_id: string;
  height: number;
  width: number;
  title: string;
  x: number;
  y: number;
  type: 'bar' | 'line' | 'pie';
};

export type ChartSettings = {
  xAxisColumn: number;
  yAxisColumns: number[];
}

export type TData = Record<string, string | number>;

export type ChartData = {
  chartId: string;
  index: string;
  data: Array<TData>;
  categories: Array<string>;
}

export type ChartWithData = Chart & Omit<ChartData, 'chartId'>;
