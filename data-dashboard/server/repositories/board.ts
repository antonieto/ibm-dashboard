import { PrismaClient } from '@prisma/client';
import type { Board, User } from '../models';

export interface IBoardRepository {
  getAll(): Promise<Board[]>;
  findOne(id: string): Promise<Board>;
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

  async findOne(id: string): Promise<Board> {
    try {
      const board = await this.db.boards.findFirstOrThrow({ where: { board_id: id } });
      return {
        boardId: board.board_id,
        createdAt: new Date(board.createdAt),
        name: board.title,
        ownerId: board.user_id,
        title: board.title,
      };
    } catch (e) {
      throw new Error('Failed to find board');
    }
  }
  
  async create(board: Board, owner: User): Promise<Board> {
    const newBoard = await this.db.boards.create({
      data: {
        title: board.title,
        user_id: owner.id,
      },
    });

    return {
      boardId: newBoard.board_id,
      createdAt: newBoard.createdAt,
      name: newBoard.title,
      ownerId: newBoard.user_id,
      title: newBoard.title,
    };
  }
}
