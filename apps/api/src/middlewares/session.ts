import { SESSION_SECRET } from '@api/config';
import { SESSION_AGE } from '@api/enums/auth';
import redis from '@api/integrations/redis';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { Server } from 'socket.io';

export type SocketMiddleware = Parameters<Server['use']>[0];

const redisStore = new RedisStore({
  client: redis,
  prefix: 'myapp:',
});

export const sessionMiddleWare = session({
  secret: SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * SESSION_AGE,
    sameSite: 'lax',
    secure: false,
  },
  store: redisStore,
});

export const withSession =
  (middleware): SocketMiddleware =>
  (socket, next) =>
    middleware(socket.request, {}, next);
