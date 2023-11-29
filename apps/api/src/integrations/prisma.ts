import { PrismaClient } from '@prisma/client';

type G = typeof globalThis;
interface CustomNodeJsGlobal extends G {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['info'],
  });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
