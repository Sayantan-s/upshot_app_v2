import { JWTMetaData } from '@api/controller/auth/types';
import { UserService } from '@api/services/users';

const queries = {
  getProducts: async (...args) => {
    // id -> userId
    const { id }: JWTMetaData = args[2];
    const data = await UserService.fetch({ id }, { products: true });
    return data.products;
  },
};

// const mutations = {};

export class GQLProductResolver {
  static queries = queries;
  // static mutations = mutations;
}
