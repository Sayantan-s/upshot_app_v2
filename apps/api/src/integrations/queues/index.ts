import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@api/config';
import { ConnectionOptions, Queue, Worker } from 'bullmq';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { JobFn } from './type';
export class MessageQueue<TData> {
  private queue: Queue;
  static queueNameAbbrv = 'QUEUE_NAME';
  queueName: string;
  private static connection: ConnectionOptions = {
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    port: +REDIS_PORT,
    tls: {
      rejectUnauthorized: false,
    },
  };
  constructor(messageQueueName: string, callback: JobFn) {
    this.queueName = `${MessageQueue.queueNameAbbrv}_${messageQueueName}`;
    this.queue = new Queue(this.queueName, {
      connection: MessageQueue.connection,
    });
    this.consume(callback);
  }
  async produce(msg: string, data: TData) {
    const producedId = uuid();
    const message = await this.queue.add(msg, { ...data, prodId: producedId });
    console.log(chalk.bgGray.bold.yellow(`BullMQ Produce -> ${message.id}`));
    return producedId;
  }

  private async consume(callback: JobFn) {
    const queueName = this.queueName;
    new Worker(
      queueName,
      async (job) => {
        console.log(
          chalk.bgGray.bold.yellow(
            `BullMQ Consume -> ${job.queueQualifiedName}_${job.id}`
          )
        );
        const returnType = await callback(job);
        return returnType;
      },
      {
        connection: MessageQueue.connection,
      }
    );
  }
}
