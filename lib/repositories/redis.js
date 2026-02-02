import { createClient } from 'redis';

let client = null;
let clientPromise = null;

async function getClient(url) {
  if (!client) {
    client = createClient({ url });
    client.on('error', (error) => {
      console.error('Redis Client Error', error);
    });
    clientPromise = client.connect();
  }

  if (clientPromise) {
    await clientPromise;
  } else if (client && !client.isOpen) {
    clientPromise = client.connect();
    await clientPromise;
  }

  return client;
}

export class RedisRepository {
  constructor(redisUrl) {
    this.redisUrl = redisUrl;
  }

  async getViewsCountByUsername(username) {
    const redis = await getClient(this.redisUrl);
    const key = `views:${username}`;
    const value = await redis.get(key);
    return value === null ? 0 : Number.parseInt(value, 10);
  }

  async addViewByUsername(username) {
    const redis = await getClient(this.redisUrl);
    const key = `views:${username}`;
    await redis.incr(key);
  }
}
