import { PrismaClient } from '@prisma/client';
import type { IBoardRepository } from './repositories/board';
import { PrismaBoardRepository } from './repositories/board';
import { IUserRepository, PrismaUserRepository } from './repositories/user';
import { DataSourceRepository, PrismaDataSourceRepository } from './repositories/dataSource';
import AzureStorageService from './services/storageService';

const FILE_STORAGE_CONTAINER_NAME = 'data-sources';

interface StorageService {
  uploadFile(fileName: string, fileBuffer: Buffer): Promise<string>;
  getFiles(): Promise<string[]>;
}

export interface Service {
  boardsRepository: IBoardRepository;
  usersRepository: IUserRepository;
  fileStorage: StorageService;
  dataSourcesRepository: DataSourceRepository;
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
    return {
      boardsRepository,
      usersRepository,
      fileStorage,
      dataSourcesRepository,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
