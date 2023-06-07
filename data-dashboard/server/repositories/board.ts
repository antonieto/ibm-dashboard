import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import type { Board } from '../models';

export interface IBoardRepository {
  getAllByUserId(userId: string): Promise<Board[]>;
  findOne(id: string): Promise<Board>;
  create(board: Pick<Board, 'title' | 'ownerId'>): Promise<Board>;
}

export class PrismaBoardRepository implements IBoardRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllByUserId(userId: string): Promise<Board[]> {
    const fetchedBoards = await this.db.boards.findMany({ where: { user_id: userId } });
    return fetchedBoards.map((board) => ({
      boardId: board.board_id,
      createdAt: new Date(board.createdAt),
      ownerId: board.user_id,
      title: board.title,
    }));
  }

  async findOne(id: string): Promise<Board> {
    try {
      const board = await this.db.boards.findFirstOrThrow({
        where: { board_id: id },
      });
      return {
        boardId: board.board_id,
        createdAt: new Date(board.createdAt),
        ownerId: board.user_id,
        title: board.title,
      };
    } catch (e) {
      throw new Error('Failed to find board');
    }
  }

  async create(board: Pick<Board, 'title' | 'ownerId'>): Promise<Board> {
    try {
      const newBoard = await this.db.boards.create({
        data: {
          title: board.title,
          user_id: board.ownerId,
        },
      });

      return {
        boardId: newBoard.board_id,
        createdAt: newBoard.createdAt,
        ownerId: newBoard.user_id,
        title: newBoard.title,
      };
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create board',
      });
    }
  }
}
