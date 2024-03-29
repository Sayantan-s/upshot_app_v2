import { ORIGIN, PORT } from '@api/config';
import { Redis } from '@api/integrations/redis';
import chalk from 'chalk';
import express from 'express';
import http from 'http';

export class Server {
  public static instance: Server | null;
  app: ReturnType<typeof express>;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.server.listen(PORT, () => {
      console.log(chalk.bgGray.bold.redBright(`SERVER RUNNING ON ${ORIGIN}`));
    });
    process.on('SIGINT', async () => {
      await Redis.client.cache.flushall();
      await Redis.client.cache.disconnect();
      await this.server.close();
    });
  }
  public static init() {
    if (!Server.instance) Server.instance = new Server();
    return Server.instance;
  }
}
