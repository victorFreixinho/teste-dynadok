import { injectable } from "inversify";
import Redis from "ioredis";
import { CacheManager } from "../../ports/output/cache/CacheManager";

@injectable()
export class CacheManagerImpl implements CacheManager {

  private DEFAULT_TTL = 3600; // 1 hora em segundos
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: process.env.REDIS_HOST || '', port: 6379 });
  }

  async saveCustomer(id: string, customer: Object): Promise<void> {
    const key = `customer:${id}`;
    const value = JSON.stringify(customer);

    await this.redis.set(key, value, "EX", this.DEFAULT_TTL);
  }

  async getCustomer(id: string): Promise<any> {
    const key = `customer:${id}`;
    const value = await this.redis.get(key);

    if (!value) {
      return null; 
    }

    return JSON.parse(value);
  }

  close(): void {
    this.redis.disconnect();
  }
}
