import { withContext } from '@api/middlewares/gql-authorization';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import { Product } from './product';
import { Shot } from './shot';

export class GQLService {
  public static async init() {
    const server = new ApolloServer({
      typeDefs: `
        type Query{
            ${Product.queries}
            ${Shot.queries}
        }
        type Mutation{
          ${Shot.mutations}
        }
        ${Product.typeDefs}
        ${Shot.typeDefs}
      `,
      resolvers: {
        Query: {
          ...Product.resolvers.queries,
          ...Shot.resolvers.queries,
        },
        Mutation: {
          ...Shot.resolvers.mutations,
        },
      },
    });
    await server.start();
    return expressMiddleware(server, {
      context: withContext,
    });
  }
}
