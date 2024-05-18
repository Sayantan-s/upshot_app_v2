import { QSTASH_API_KEY } from '@api/config';
import { Client } from '@upstash/qstash/.';

export class Scheduler {
  private client: Client;
  private static clientInstance: Client;
  constructor() {
    this.client = new Client({
      token: QSTASH_API_KEY,
    });
  }
  static get client() {
    if (!Scheduler.clientInstance)
      Scheduler.clientInstance = new Scheduler().client;
    return Scheduler.clientInstance;
  }
}
