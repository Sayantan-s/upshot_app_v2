import {
  MutationUpdateShotArgs,
  QueryGetShotsArgs,
} from '@api/__generated__/graphql';
import { CacheKey } from '@api/enums/cache';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { ShotService } from '@api/services/shot';
import { Shot } from '.';
import { GQLService } from '..';
import { SUBSCRIPTION } from './subscriptions';

const queries = {
  getShots: async (...args) => {
    // id -> userId
    const { productId }: QueryGetShotsArgs = args[1];
    const data = await ProductService.fetch({ id: productId }, { shots: true });
    return data.shots;
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
