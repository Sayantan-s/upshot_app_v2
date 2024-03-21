import { withContext } from '@api/middlewares/gql-authorization';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import { Product } from './product';

export class GQLService {
  public static async init() {
    const server = new ApolloServer({
      typeDefs: `
        type Query{
            ${Product.queries}
        }
        ${Product.typeDefs}
      `,
      resolvers: {
        Query: {
          ...Product.resolvers.queries,
        },
      },
    });
    await server.start();
    return expressMiddleware(server, {
      context: withContext,
    });
  }
}
