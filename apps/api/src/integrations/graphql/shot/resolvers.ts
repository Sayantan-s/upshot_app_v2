import {
  MutationUpdateShotArgs,
  QueryGetShotsByProductIdArgs,
} from '@api/__generated__/graphql';
import { CacheKey } from '@api/enums/cache';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { ShotService } from '@api/services/shot';
import { ShotStatus } from '@prisma/client';
import { Shot } from '.';
import { GQLService } from '..';
import { SUBSCRIPTION } from './subscriptions';

const queries = {
  getShotsByProductId: async (...args) => {
    // id -> userId
    const { productId }: QueryGetShotsByProductIdArgs = args[1];
    const data = await ProductService.fetch({ id: productId }, { shots: true });
    return data.shots;
  },

  getShots: async () => {
    const data = await ShotService.fetchMany({
      where: {
        status: ShotStatus.SHOOT,
        isArchived: false,
      },
      include: {
        product: true,
      },
    });
    return data;
  },
};

const mutations = {
  updateShot: async (...args) => {
    const { shotInput, shotId }: MutationUpdateShotArgs = args[1];
    const shotData = await ShotService.update(
      { id: shotId },
      shotInput as Shot
    );
    const key = `${CacheKey.SHOT_UPDATE}_${shotId}`;
    await Redis.client.cache.setex(key, 200, JSON.stringify(shotData));
    return 'Success';
  },
};

const subscriptions = {
  lauchShot: {
    subscribe: () =>
      GQLService.pubSub.asyncIterator([SUBSCRIPTION.LAUNCH_SHOT]),
  },
};

export class GQLShotResolver {
  static queries = queries;
  static mutations = mutations;
  static subcriptions = subscriptions;
}
