import { generatePosts } from '@api/apis/serverless/generatePosts';
import { OnboardingShotCreationStatus } from '@api/enums/shot';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { ShotService } from '@api/services/shot';
import { CreationMethod, ProductStatus, ShotStatus } from '@prisma/client';
import { MessageQueue } from '..';
import { JobFn } from '../type';
import { MessageQueueInput } from './type';

export default class GenaiQueue {
  private static instance: MessageQueue<MessageQueueInput> = null;
  static messageName = 'call-gen-posts';
  private static workerFunction: JobFn = async (job) => {
    let productId: string | null = null;
    const keyName = `${productId}_generateProductOnboarding`;
    try {
      const genPostMetaData = job.data;
      const data = await generatePosts(genPostMetaData);
      productId = genPostMetaData.productId;
      genPostMetaData.productDescription &&
        (await ProductService.update(
          { id: productId },
          {
            productDescription: genPostMetaData.productDescription,
          }
        ));

      const shotsPayload = data.map((payload) => ({
        ...payload,
        status: ShotStatus.IDLE,
        productType: ProductStatus.IDLE,
        creationMethod: CreationMethod.GEN_AI,
        productId,
      }));

      await ShotService.createMany(shotsPayload);
      await Redis.client.cache.del(keyName);
    } catch (error) {
      productId &&
        (await Redis.client.cache.set(
          keyName,
          OnboardingShotCreationStatus.FAILED
        ));
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
