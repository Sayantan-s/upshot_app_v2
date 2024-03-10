import { generatePosts } from '@api/apis/serverless/generatePosts';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { MessageQueue } from '..';
import { JobFn } from '../type';
import { MessageQueueInput } from './type';

export default class GenaiQueue {
  private static instance: MessageQueue<MessageQueueInput> = null;
  static messageName = 'call-gen-posts';
  private static workerFunction: JobFn = async (job) => {
    try {
      const { prodId: produceId, ...genPostMetaData } = job.data;
      const data = await generatePosts(genPostMetaData);
      const productId = genPostMetaData.productId;
      await Redis.client.cache.set(produceId, JSON.stringify(data));
      genPostMetaData.productDescription &&
        (await ProductService.update(
          { id: productId },
          {
            productDescription: genPostMetaData.productDescription,
          }
        ));
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
