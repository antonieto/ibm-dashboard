import { PrismaClient } from '@prisma/client';
import type { DataSource } from '../models';

export interface DataSourceRepository {
  list(): Promise<DataSource[]>;
  listByUserId(userId: string): Promise<DataSource[]>;
  create(dataSource: Pick<DataSource, 'externalHandle' | 'fileName' | 'boardId'>): Promise<DataSource>;
}

export class PrismaDataSourceRepository implements DataSourceRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async list(): Promise<DataSource[]> {
    const dataSources = await this.db.data_sources.findMany();
    return dataSources.map((dataSource) => ({
      id: dataSource.data_source_id,
      createdAt: new Date(dataSource.createdAt),
      externalHandle: dataSource.external_handle,
      fileName: dataSource.file_name,
      name: dataSource.file_name,
      boardId: dataSource.board_id,
    }));
  }

  async listByUserId(userId: string): Promise<DataSource[]> {
    const dataSources = await this.db.data_sources.findMany({
      where: {
        board: {
          user_id: userId,
        },
      },
    });
    return dataSources.map((dataSource) => ({
      id: dataSource.data_source_id,
      createdAt: new Date(dataSource.createdAt),
      externalHandle: dataSource.external_handle,
      fileName: dataSource.file_name,
      name: dataSource.file_name,
      boardId: dataSource.board_id,
    }));
  }

  async create(dataSource: DataSource): Promise<DataSource> {
    const createdDataSource = await this.db.data_sources.create({
      data: {
        external_handle: dataSource.externalHandle,
        file_name: dataSource.fileName,
        board_id: dataSource.boardId,
      },
    });
    return {
      id: createdDataSource.data_source_id,
      createdAt: new Date(createdDataSource.createdAt),
      externalHandle: createdDataSource.external_handle,
      fileName: createdDataSource.file_name,
      name: createdDataSource.file_name,
      boardId: createdDataSource.board_id,
    };
  }
}
