import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@api/config';
import chalk from 'chalk';
import Redis from 'ioredis';

const r = new Redis({
  host: REDIS_HOST!,
  port: +REDIS_PORT!,
  password: REDIS_PASSWORD!,
});

type G = typeof globalThis;
interface CustomNodeJsGlobal extends G {
  redis: Redis;
}

declare const global: CustomNodeJsGlobal;

const redis = global.redis || r;

if (process.env.NODE_ENV === 'development') global.redis = redis;

redis.on('connect', () => {
  console.log(chalk.blue.bgGreenBright.bold('Connected to Redis...'));
});

export default redis;
