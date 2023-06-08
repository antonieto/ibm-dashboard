export type DataSource = {
  id: string;
  name: string;
  createdAt: Date;
  externalHandle: string;
  fileName: string;
  boardId: string | null;
};

export type ChartCategory = {
  column: number;
  name: string;
}

export type DataSourceDescription = {
  categories: ChartCategory[];
  data: Record<string, string | number>[];
}
