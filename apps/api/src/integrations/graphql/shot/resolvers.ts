import { ProductService } from '@api/services/product';

const queries = {
  getShots: async (...args) => {
    // id -> userId
    const { productId }: { productId: string } = args[1];
    const data = await ProductService.fetch({ id: productId }, { shots: true });
    return data.shots;
  },
};

const mutations = {
  updateShot: async () => {
    // id -> userId
    // const { shot, shotId }: { shotId: string; shot: Shot } = args[1];
    // const data = await ShotService.update({ id: shotId }, {  });
    return 'Success';
  },
};

export class GQLShotResolver {
  static queries = queries;
  static mutations = mutations;
}
