import { queries } from './queries';
import { GQLUserResolver } from './resolvers';
import { GQLUserTypeDefs } from './typeDefs';

export class User {
  public static queries = queries;
  public static mutations = '';
  public static resolvers = GQLUserResolver;
  public static typeDefs = `
    ${GQLUserTypeDefs.enums}
    ${GQLUserTypeDefs.types}
  `;
  public static root = `users: [${GQLUserTypeDefs.root}!]!`;
  //   public static subscriptions = "";
}
