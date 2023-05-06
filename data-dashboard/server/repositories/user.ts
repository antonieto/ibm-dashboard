import { PrismaClient } from '@prisma/client';
import { User } from '../models';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<User>;
}

export class PrismaUserRepository implements IUserRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async findAll(): Promise<User[]> {
    const users = await this.db.users.findMany();
    return users.map((user) => ({
      id: user.user_id,
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
    }));
  }

  async findById(id: string): Promise<User> {
    const user = await this.db.users.findUnique({ where: { user_id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.user_id,
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
    };
  }

  async create(user: User): Promise<User> {
    const newUser = await this.db.users.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
    return {
      id: newUser.user_id,
      createdAt: newUser.createdAt,
      email: newUser.email,
      password: newUser.password,
    };
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.db.users.update({
      where: { user_id: id },
      data: {
        email: user.email,
        password: user.password,
      },
    });
    return {
      id: updatedUser.user_id,
      createdAt: updatedUser.createdAt,
      email: updatedUser.email,
      password: updatedUser.password,
    };
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.db.users.delete({
      where: { user_id: id },
    });
    return {
      id: deletedUser.user_id,
      createdAt: deletedUser.createdAt,
      email: deletedUser.email,
      password: deletedUser.password,
    };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.db.users.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.user_id,
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
    };
  }
}
