import { PrismaClient } from '@prisma/client';
import type { IBoardRepository } from './repositories/board';
import { PrismaBoardRepository } from './repositories/board';
import { IUserRepository, PrismaUserRepository } from './repositories/user';
import { DataSourceRepository, PrismaDataSourceRepository } from './repositories/dataSource';
import AzureStorageService, { StorageService } from './services/storageService';
import { IChartRepository, PrismaChartRepository } from './repositories/chart';
import ChartSerializer from './services/chartSerializer';

const FILE_STORAGE_CONTAINER_NAME = 'data-sources';

export interface Service {
  boardsRepository: IBoardRepository;
  usersRepository: IUserRepository;
  fileStorage: StorageService;
  dataSourcesRepository: DataSourceRepository;
  chartsRepository: IChartRepository;
  chartSerializer: ChartSerializer;
}

export const initializeService = (): Service | null => {
  if (process.env.DATABASE_URL === undefined) throw new Error('DATABASE_URL is undefined');
  try {
    const db = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}`,
        },
      },
    });

    const boardsRepository = new PrismaBoardRepository(db);
    const usersRepository = new PrismaUserRepository(db);
    const fileStorage = new AzureStorageService(FILE_STORAGE_CONTAINER_NAME);
    const dataSourcesRepository = new PrismaDataSourceRepository(db);
    const chartsRepository = new PrismaChartRepository(db);
    const chartSerializer = new ChartSerializer(fileStorage);

    return {
      boardsRepository,
      usersRepository,
      fileStorage,
      dataSourcesRepository,
      chartsRepository,
      chartSerializer,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
