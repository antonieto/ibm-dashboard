import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import env from '@/lib/env';

const createRedisClient = async () => {
  const client: RedisClientType = createClient({
    url: env.REDIS_CONNECTION_STRING,
  });
  await client.connect();
  return client;
};

export default createRedisClient;
