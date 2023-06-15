import { RedisClientType } from 'redis';
import { z } from 'zod';
import { IS_CACHE_ENABLED } from '@/lib/constants';

export type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

interface CacheService {
  get<T extends JSONSerializable>(
    key: string,
    schema: z.ZodSchema<T>
  ): Promise<T | null>;
  set<T extends JSONSerializable>(key: string, value: T): Promise<void>;
}

export class RedisCacheService implements CacheService {
  private readonly client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  async get<T extends JSONSerializable>(
    key: string,
    schema: z.ZodSchema<T>,
  ): Promise<T | null> {
    if (!IS_CACHE_ENABLED) {
      return null;
    }
    try {
      const cachedValue = await this.client.get(key);
      if (!cachedValue) {
        return null;
      }
      const jsonParsed = JSON.parse(cachedValue);
      return schema.parse(jsonParsed);
    } catch (e) {
      return null;
    }
  }

  async set<T extends JSONSerializable>(key: string, value: T): Promise<void> {
    if (!IS_CACHE_ENABLED) {
      return;
    }
    await this.client.set(key, JSON.stringify(value));
  }
}

export default CacheService;
