import { ORIGIN, PORT } from '@api/config';
import { Redis } from '@api/integrations/redis';
import { Tunnel } from '@api/integrations/tunnel';
import chalk from 'chalk';
import express from 'express';
import http from 'http';
import path from 'path';

export class Server {
  public static instance: Server | null;
  public static webhookInterceptorOrigin: string;
  public static tunnel: string;
  app: ReturnType<typeof express>;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.server.listen(PORT, async () => {
      const tunnel = await Tunnel.create();
      Server.tunnel = tunnel.uri;
      Server.webhookInterceptorOrigin = tunnel.webhookInterceptorOrigin;
      console.log(`Ngrok initialized at:: ${chalk.blue(Server.tunnel)}`);
      console.log(`Server running on:: ${chalk.red(ORIGIN)}`);
    });
    process.on('SIGINT', () => {
      Redis.client.cache.flushall();
      Redis.client.cache.disconnect();
      Tunnel.destroy();
      this.server.close();
    });
  }
  public static init() {
    if (!Server.instance) Server.instance = new Server();
    return Server.instance;
  }

  public static serveFrontend() {
    if (!Server.instance) return;
    const { app } = Server.instance;
    const dirName = path.resolve(__dirname, '..');
    app.use(express.static(path.join(dirName, 'client')));
    app.get('/', (_, res) => {
      res.sendFile(path.join(dirName, 'client', 'index.html'));
    });
  }
}
