import path from 'node:path';
import { getEnv, requireEnv } from '../env';
import { FileRepository } from './file';
import { RedisRepository } from './redis';

export function createRepository() {
  const repositoryType = requireEnv('REPOSITORY');

  switch (repositoryType) {
    case 'redis': {
      const redisUrl = requireEnv('REDIS_URL');
      return new RedisRepository(redisUrl);
    }
    case 'file': {
      const storagePath = getEnv('FILE_STORAGE_PATH');
      const resolvedPath = storagePath && storagePath !== ''
        ? storagePath
        : path.join(process.cwd(), 'storage');
      return new FileRepository(resolvedPath);
    }
    case 'pdo': {
      throw new Error('REPOSITORY=pdo is not supported in this Next.js build');
    }
    default:
      throw new Error(`Unsupported repository \`${repositoryType}\``);
  }
}
