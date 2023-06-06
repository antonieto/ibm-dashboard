import { PrismaClient } from '@prisma/client';
import type { IBoardRepository } from './repositories/board';
import { PrismaBoardRepository } from './repositories/board';
import { IUserRepository, PrismaUserRepository } from './repositories/user';
import { DataSourceRepository, PrismaDataSourceRepository } from './repositories/dataSource';
import AzureStorageService, { StorageService } from './services/storageService';
import { IChartRepository, PrismaChartRepository } from './repositories/chart';
import ChartSerializer from './services/chartSerializer';
import DataSourceSerializer from './services/dataSourceSerializer';

let db: PrismaClient | null = null;
import CacheService, { RedisCacheService } from './services/cacheService';
import createRedisClient from './internal/redis';

const FILE_STORAGE_CONTAINER_NAME = 'data-sources';

export interface Service {
  boardsRepository: IBoardRepository;
  usersRepository: IUserRepository;
  fileStorage: StorageService;
  dataSourcesRepository: DataSourceRepository;
  chartsRepository: IChartRepository;
  chartSerializer: ChartSerializer;
  dataSourceSerializer: DataSourceSerializer;
  cacheService: CacheService;
}

export const initializeService = async (): Promise<Service | null> => {
  if (process.env.DATABASE_URL === undefined) throw new Error('DATABASE_URL is undefined');
  try {
    if (db === null) {
      db = new PrismaClient({
        datasources: {
          db: {
            url: `${process.env.DATABASE_URL}`,
          },
        },
      });
    }

    const redisClient = await createRedisClient();

    const boardsRepository = new PrismaBoardRepository(db);
    const usersRepository = new PrismaUserRepository(db);
    const fileStorage = new AzureStorageService(FILE_STORAGE_CONTAINER_NAME);
    const dataSourcesRepository = new PrismaDataSourceRepository(db);
    const chartsRepository = new PrismaChartRepository(db);
    const chartSerializer = new ChartSerializer(fileStorage, dataSourcesRepository);
    const dataSourceSerializer = new DataSourceSerializer(fileStorage, dataSourcesRepository);
    const cacheService = new RedisCacheService(redisClient);

    return {
      boardsRepository,
      usersRepository,
      fileStorage,
      dataSourcesRepository,
      chartsRepository,
      chartSerializer,
      dataSourceSerializer,
      cacheService,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
