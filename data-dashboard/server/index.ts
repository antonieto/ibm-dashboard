import { PrismaClient } from '@prisma/client';
import type { IBoardRepository } from './repositories/board';
import { PrismaBoardRepository } from './repositories/board';

export interface Service {
  boardsRepository: IBoardRepository;
}

export const initializeService = (): Service => {
  const db = new PrismaClient();

  return {
    boardsRepository: new PrismaBoardRepository(db),
  };
};

export const service = initializeService();
