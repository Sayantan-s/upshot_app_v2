import { MessageQueue } from '..';
import { JobFn } from '../type';
import { MessageQueueInput } from './type';

export default class ShotQueue {
  private static instance: MessageQueue<MessageQueueInput> = null;
  static messageName = 'shot';
  private static workerFunction: JobFn = async (job) => {
    try {
      const shot: MessageQueueInput = job.data;
      console.log('TO BE PUT INSIDE FEED', shot);
    } catch (error) {
      console.log(error);
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
