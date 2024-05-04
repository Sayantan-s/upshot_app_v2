import { mutations } from './mutations';
import { queries } from './queries';
import { GQLShotResolver } from './resolvers';
import { subscriptions } from './subscriptions';
import { GQLShotTypeDefs } from './typeDefs';

export class Shot {
  public static queries = queries;
  public static mutations = mutations;
  public static subscriptions = subscriptions;
  public static resolvers = GQLShotResolver;
  public static typeDefs = `
    ${GQLShotTypeDefs.enums}
    ${GQLShotTypeDefs.types}
  `;
  public static root = `shots: [${GQLShotTypeDefs.root}!]!`;
  //   public static subscriptions = "";
}
