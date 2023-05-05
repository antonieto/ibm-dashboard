import { PrismaClient } from '@prisma/client';
import type { IBoardRepository } from './repositories/board';
import { PrismaBoardRepository } from './repositories/board';

export interface Service {
  boardsRepository: IBoardRepository;
}

export const initializeService = (): Service => {
  if (process.env.DATABASE_URL === undefined) throw new Error('DATABASE_URL is undefined');
  const db = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?sslmode=require`,
      },
    },
  });

  return {
    boardsRepository: new PrismaBoardRepository(db),
  };
};
