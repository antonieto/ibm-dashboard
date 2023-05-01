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
    const users = await this.db.users.findMany();
    return users.map((user) => ({
      name: user.email,
      ownerId: user.user_id,
    }));
  }
}
