import { RedisClientType } from 'redis';

export default interface CacheService {
  get(key: string): Promise<string | null>;
}

export class RedisCacheService implements CacheService {
  private readonly client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    const result = this.client.get(key);
    console.log('result', result);
    return key;
  }
}
