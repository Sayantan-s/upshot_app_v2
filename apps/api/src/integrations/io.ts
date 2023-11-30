import { CLIENT_ORIGIN } from '@api/config';
import { withApiKeysSocket, withAuthSocket } from '@api/middlewares/auth';
import chalk from 'chalk';
import http from 'http';
import { Server, Socket } from 'socket.io';

export class IO {
  instance: Server;
  constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.instance = new Server(server, {
      cors: {
        origin: CLIENT_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
  }

  init(fn: (socket: Socket) => void) {
    this.instance.use(withApiKeysSocket);
    this.instance.use(withAuthSocket);
    this.instance.on('connection', fn);
  }

  static execute(io: Socket) {
    console.log(io.request.session);
    console.log(chalk.blueBright(`${io.id} Connected to client server...`));
    io.on('disconnect', () => {
      console.log(`${io.id} Disconnected from client server...`);
    });
  }
}
