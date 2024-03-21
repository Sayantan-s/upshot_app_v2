import { queries } from './queries';
import { GQLProductResolver } from './resolvers';
import { GQLProductTypeDefs } from './typeDefs';

export class Product {
  public static queries = queries;
  public static mutations = '';
  public static resolvers = GQLProductResolver;
  public static typeDefs = `
    ${GQLProductTypeDefs.enums}
    ${GQLProductTypeDefs.types}
  `;
  public static root = `products: [${GQLProductTypeDefs.root}!]!`;
  //   public static subscriptions = "";
}
