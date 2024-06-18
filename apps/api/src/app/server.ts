import { NGROK_AUTHTOKEN, NODE_ENV, ORIGIN, PORT } from '@api/config';
import { Redis } from '@api/integrations/redis';
import chalk from 'chalk';
import express from 'express';
import http from 'http';
import ngrok from 'ngrok';
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
      Server.tunnel = await ngrok.connect({
        proto: 'http',
        addr: 8080, // replace with your server port
        authtoken: NGROK_AUTHTOKEN,
      });
      Server.webhookInterceptorOrigin =
        NODE_ENV === 'local' ? Server.tunnel : ORIGIN;
      console.log(`Ngrok initialized at:: ${chalk.blue(Server.tunnel)}`);
      console.log(`Server running on:: ${chalk.red(ORIGIN)}`);
    });
    process.on('SIGINT', () => {
      Redis.client.cache.flushall();
      Redis.client.cache.disconnect();
      ngrok.disconnect(Server.tunnel);
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
