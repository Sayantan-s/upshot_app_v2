import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@api/config';
import chalk from 'chalk';
import RedisDB from 'ioredis';

type G = typeof globalThis;
interface CustomNodeJsGlobal extends G {
  redis: RedisDB;
}

declare const global: CustomNodeJsGlobal;

export class Redis {
  private URL = `rediss://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
  cache: RedisDB;
  private static clientInstance = {} as Redis;
  constructor() {
    const r = new RedisDB(this.URL);
    this.cache = global.redis || r;
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'local'
    )
      global.redis = this.cache;
    this.cache.on('connect', () => {
      console.log(chalk.blue.bgGreenBright.bold('Connected to Redis...'));
    });

    this.cache.on('disconnect', () => {
      console.log(chalk.blue.bgGreenBright.bold('Disconnected from Redis...'));
    });
  }

  static get client() {
    if (!Redis.clientInstance.cache) {
      const redisInstance = new Redis();
      Redis.clientInstance.cache = redisInstance.cache;
    }
    return Redis.clientInstance;
  }
}
