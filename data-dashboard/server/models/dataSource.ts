export type DataSourceHandle = {
  resourceUri: string;
  fileName: string;
};

export type DataSource = {
  id: string;
  name: string;
  createdAt: Date;
  externalHandle: string;
  fileName: string;
};
