import { RedisClientType } from 'redis';
import { z } from 'zod';

interface CacheService {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

export class RedisCacheService implements CacheService {
  private readonly client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    try {
      const result = await this.client.get(key);
      console.log('result', result);
      return result;
    } catch (e) {
      console.log('error', e);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (e) {
      console.log('error', e);
    }
  }

  async getOrSet<T extends JSONSerializable>(
    key: string,
    value: T,
    ttl: number,
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    const cachedValue = await this.get(key);
    if (cachedValue) {
      return schema.parse(JSON.parse(cachedValue));
    }
    await this.set(key, JSON.stringify(value));
    await this.client.expire(key, ttl);

    return value;
  }
}

export default CacheService;
