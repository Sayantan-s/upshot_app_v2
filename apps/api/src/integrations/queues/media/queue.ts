import { MessageQueue } from '..';
import { JobFn } from '../type';
import { MessageQueueInput, Service } from './type';

export default class MediaQueue {
  private static instance: MessageQueue<MessageQueueInput> = null;
  static messageName = 'media';
  private static workerFunction: JobFn = async (job) => {
    try {
      const data: MessageQueueInput = job.data;
      await Service[data.collection].update(
        { id: data.entity },
        {
          media: {
            [data.mediaKeyName]: {
              raw: data.raw,
              current: data.current,
              config: data.config,
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  static get client() {
    if (!MediaQueue.instance) {
      const instance = new MessageQueue(
        MediaQueue.messageName,
        MediaQueue.workerFunction
      );
      MediaQueue.instance = instance;
    }
    return MediaQueue.instance;
  }
}
