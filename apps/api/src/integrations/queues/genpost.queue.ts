import { NODE_ENV, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@api/config';
import { Queue } from 'bullmq';
import chalk from 'chalk';
export default class GenaiQueue<TData = unknown> {
  private queue: Queue;
  private queueName = 'QUEUE_NAME_GPUI';
  private queueMessageName = 'MESSAGE_NAME_GPUI';
  private static instance = null;
  constructor() {
    this.queue = new Queue(this.queueName, {
      connection: {
        host: REDIS_HOST,
        password: REDIS_PASSWORD,
        port: +REDIS_PORT,
        tls: {
          rejectUnauthorized: NODE_ENV !== 'development',
        },
      },
    });
  }
  async produce(data: TData) {
    const message = await this.queue.add(this.queueMessageName, data);
    console.log(
      chalk.bgGray.bold.redBright(`Job added to queue:: ${message.id}`)
    );
    return message.id;
  }

  static get client(): GenaiQueue {
    if (!GenaiQueue.instance) {
      const instance = new GenaiQueue();
      GenaiQueue.instance = instance;
    }
    return GenaiQueue.instance;
  }
}
