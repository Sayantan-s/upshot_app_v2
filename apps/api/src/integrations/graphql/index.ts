import { withContext } from '@api/middlewares/gql-authorization';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import { RequestHandler } from 'express';
import { YogaServerInstance, createSchema, createYoga } from 'graphql-yoga';
import { Product } from './product';
import { Shot } from './shot';

export class GQLService {
  private static schema = {
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
  };

  public static async init(): Promise<
    [RequestHandler, YogaServerInstance<object, object>]
  > {
    const server = new ApolloServer(GQLService.schema);
    const yoga = createYoga({
      schema: createSchema(GQLService.schema),
    });
    await server.start();
    return [
      expressMiddleware(server, {
        context: withContext,
      }),
      yoga,
    ];
  }
}
