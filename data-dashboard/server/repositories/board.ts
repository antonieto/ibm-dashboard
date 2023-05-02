import { PrismaClient } from '@prisma/client';
import type { Board } from '../models';

export interface IBoardRepository {
  getAll(): Promise<Board[]>;
}

export class PrismaBoardRepository implements IBoardRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAll(): Promise<Board[]> {
    const fetchedBoards = await this.db.boards.findMany();
    return fetchedBoards.map((board) => ({
      boardId: board.board_id,
      createdAt: new Date(board.createdAt),
      name: board.title,
      ownerId: board.user_id,
      title: board.title,
    }));
  }
}
