import { access, appendFile, readFile, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

export class FileRepository {
  constructor(storagePath) {
    this.storagePath = storagePath;
  }

  async getViewsCountByUsername(username) {
    await this.ensureStorage();
    const counterFilePath = this.getCounterFilePath(username);

    try {
      const value = await readFile(counterFilePath, 'utf8');
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? 0 : parsed;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return 0;
      }
      throw error;
    }
  }

  async addViewByUsername(username) {
    await this.ensureStorage();
    const viewsFilePath = this.getViewsFilePath(username);
    const counterFilePath = this.getCounterFilePath(username);

    await appendFile(viewsFilePath, `${new Date().toISOString()}\n`, 'utf8');

    const current = await this.getViewsCountByUsername(username);
    await writeFile(counterFilePath, String(current + 1), 'utf8');
  }

  async ensureStorage() {
    const stats = await stat(this.storagePath).catch((error) => {
      if (error.code === 'ENOENT') {
        throw new Error('Counter storage is not a directory');
      }
      throw error;
    });

    if (!stats.isDirectory()) {
      throw new Error('Counter storage is not a directory');
    }

    await access(this.storagePath, constants.W_OK).catch(() => {
      throw new Error('Counter storage is not writable');
    });
  }

  getViewsFilePath(username) {
    return path.join(this.storagePath, `${username}-views`);
  }

  getCounterFilePath(username) {
    return path.join(this.storagePath, `${username}-views-count`);
  }
}
