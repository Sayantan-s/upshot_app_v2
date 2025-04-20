import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@api/config';
import { ConnectionOptions, Queue, Worker } from 'bullmq';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { JobFn } from './type';

enum Actions {
  POST_PRODUCE = 'post_produce',
  POST_CONSUME = 'post_consume',
}
export class MessageQueue<TData> {
  private queue: Queue;
  static queueNameAbbrv = 'QUEUE_NAME';
  static action = Actions;
  private actionStore: Map<Actions, Array<(...args: unknown[]) => void>>;
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
    this.actionStore = new Map();
    this.consume(callback);
  }
  async produce(msg: string, data: TData) {
    const producedId = uuid();
    const message = await this.queue.add(msg, { ...data, prodId: producedId });
    this.actionStore.get(Actions.POST_PRODUCE).forEach((cb, index) => {
      console.log(
        chalk.bgGray.bold.yellow(
          `BullMQ Produce -> Action: ${Actions.POST_PRODUCE} -> Index: ${index}`
        )
      );
      cb(producedId);
    });
    console.log(chalk.bgGray.bold.yellow(`BullMQ Produce -> ${message.id}`));
    return producedId;
  }

  private async consume(callback: JobFn) {
    const queueName = this.queueName;
    new Worker(
      queueName,
      async (job) => {
        const returnType = await callback(job);
        this.actionStore.get(Actions.POST_CONSUME).forEach((cb, index) => {
          console.log(
            chalk.bgGray.bold.yellow(
              `BullMQ Produce -> Action: ${Actions.POST_CONSUME} -> Index: ${index}`
            )
          );
          cb();
        });
        console.log(
          chalk.bgGray.bold.yellow(
            `BullMQ Consume -> ${job.queueQualifiedName}_${job.id}`
          )
        );
        return returnType;
      },
      {
        connection: MessageQueue.connection,
      }
    );
  }

  on(action: Actions, cb: (...args: unknown[]) => void) {
    const targetActions = this.actionStore.get(action) || [];
    targetActions.push(cb);
    this.actionStore.set(action, targetActions);
  }
}
