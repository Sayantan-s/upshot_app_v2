import { NODE_ENV } from '@api/config';
import * as ngrok from '@ngrok/ngrok';
import chalk from 'chalk';
import fs from 'node:fs';

export interface ITunnelClientInstance {
  uri: string;
  filePath: string;
}

export class Tunnel {
  client: Promise<ngrok.Listener>;
  private static clientInstance: ITunnelClientInstance | undefined =
    {} as ITunnelClientInstance;
  private static filePath: string = 'assets/ngrok-url.txt';
  static async create() {
    if (NODE_ENV !== 'local') return;
    if (fs.existsSync(Tunnel.filePath)) {
      Tunnel.clientInstance.uri = fs.readFileSync(Tunnel.filePath, 'utf8');
      Tunnel.clientInstance.filePath = Tunnel.filePath;
      console.log(
        `Ngrok established at:: ${chalk.green(Tunnel.clientInstance.uri)}`
      );
    } else await setTimeout(Tunnel.create, 3000);
    return Tunnel.clientInstance;
  }

  static destroy() {
    if (NODE_ENV !== 'local') return;
    if (fs.existsSync(Tunnel.clientInstance.filePath)) {
      fs.unlinkSync(Tunnel.clientInstance.filePath);
      ngrok.disconnect(Tunnel.clientInstance.uri);
    }
  }
}
