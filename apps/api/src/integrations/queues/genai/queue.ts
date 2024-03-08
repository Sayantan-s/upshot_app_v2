import { generatePosts } from '@api/apis/serverless/generatePosts';
import { Build_In_Public } from '@prisma/client';
import { MessageQueue } from '..';
import { JobFn } from '../type';

export default class GenaiQueue {
  private static instance: MessageQueue<
    Pick<Build_In_Public, 'productName' | 'productMoto'>
  > = null;
  static messageName = 'call-gen-posts';
  private static workerFunction: JobFn = async (job) => {
    try {
      const data = await generatePosts(job.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
