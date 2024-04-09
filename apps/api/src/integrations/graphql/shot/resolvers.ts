import {
  MutationUpdateShotArgs,
  QueryGetShotsArgs,
} from '@api/__generated__/graphql';
import { ProductService } from '@api/services/product';
import { ShotService } from '@api/services/shot';
import { Shot } from '.';

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
    await ShotService.update({ id: shotId }, shotInput as Shot);
    return 'Success';
  },
};

export class GQLShotResolver {
  static queries = queries;
  static mutations = mutations;
}
