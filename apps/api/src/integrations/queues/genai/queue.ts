import { MessageQueue } from '..';
import { JobFn } from '../type';

export default class GenaiQueue {
  private static instance: MessageQueue<boolean> = null;
  static messageName = 'call-gen-posts';
  private static workerFunction: JobFn = async (job) => {
    job;
    // http call for firebase function
  };
  static get client() {
    if (!GenaiQueue.instance) {
      const instance = new MessageQueue(
        GenaiQueue.messageName,
        GenaiQueue.workerFunction
      );
      GenaiQueue.instance = instance;
    }
    return GenaiQueue.instance;
  }
}
