import { mutations } from './mutations';
import { queries } from './queries';
import { GQLShotResolver } from './resolvers';
import { GQLShotTypeDefs } from './typeDefs';

export class Shot {
  public static queries = queries;
  public static mutations = mutations;
  public static resolvers = GQLShotResolver;
  public static typeDefs = `
    ${GQLShotTypeDefs.enums}
    ${GQLShotTypeDefs.types}
  `;
  public static root = `shots: [${GQLShotTypeDefs.root}!]!`;
  //   public static subscriptions = "";
}
