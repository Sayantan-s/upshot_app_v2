import { GQLService } from '@api/integrations/graphql';
import { SUBSCRIPTION } from '@api/integrations/graphql/shot/subscriptions';
import chalk from 'chalk';
import { MessageQueue } from '..';
import { JobFn } from '../type';
import { MessageQueueInput } from './type';
export default class ShotQueue {
  private static instance: MessageQueue<MessageQueueInput> = null;
  static messageName = 'shot';
  private static workerFunction: JobFn = async (job) => {
    try {
      const shot: MessageQueueInput = job.data;
      GQLService.pubSub.publish(SUBSCRIPTION.LAUNCH_SHOT, {
        lauchShot: shot,
      });
      console.log(chalk.magenta('Subscription is created!'));
    } catch (error) {
      console.trace('ERROR', error);
    }
  };
  static get client() {
    if (!ShotQueue.instance) {
      const instance = new MessageQueue(
        ShotQueue.messageName,
        ShotQueue.workerFunction
      );
      ShotQueue.instance = instance;
    }
    return ShotQueue.instance;
  }
}
