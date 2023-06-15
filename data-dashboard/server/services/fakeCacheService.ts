import { z } from 'zod';
import CacheService, { JSONSerializable } from './cacheService';

export default class FakeCacheService implements CacheService {
  // eslint-disable-next-line
  async get<T extends JSONSerializable>(
    // eslint-disable-next-line
    key: string,
    // eslint-disable-next-line
    schema: z.ZodSchema<T>,
  ): Promise<T | null> {
    return null;
  }
  // eslint-disable-next-line
  async set<T extends JSONSerializable>(key: string, value: T): Promise<void> {

  }
}
