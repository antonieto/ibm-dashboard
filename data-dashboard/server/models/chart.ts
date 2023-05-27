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
