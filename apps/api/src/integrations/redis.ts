import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_PUBSUB_HOST,
  REDIS_PUBSUB_PASSWORD,
  REDIS_PUBSUB_PORT,
} from '@api/config';
import chalk from 'chalk';
import Redis from 'ioredis';

const URL = `rediss://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

const r = new Redis(URL);
const r2 = new Redis({
  password: REDIS_PUBSUB_PASSWORD,
  port: +REDIS_PUBSUB_PORT,
  host: REDIS_PUBSUB_HOST,
});

type G = typeof globalThis;
interface CustomNodeJsGlobal extends G {
  redis: Redis;
  pubsubRedis: Redis;
}

declare const global: CustomNodeJsGlobal;

export const redis = global.redis || r;
export const pubsubRedis = global.pubsubRedis || r2;

if (process.env.NODE_ENV === 'development') {
  global.redis = redis;
  global.pubsubRedis = pubsubRedis;
}

redis.on('connect', () => {
  console.log(chalk.blue.bgGreenBright.bold('Connected to Redis...'));
});

pubsubRedis.on('connect', () => {
  console.log(chalk.blue.bgRedBright.bold('Connected to Pubsub Redis...'));
});

redis.on('disconnect', () => {
  console.log(chalk.blue.bgGreenBright.bold('Disconnected from Redis...'));
});

pubsubRedis.on('disconnect', () => {
  console.log(chalk.blue.bgRedBright.bold('Disconnected from Pubsub Redis...'));
});
