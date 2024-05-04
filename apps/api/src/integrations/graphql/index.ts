import { withContext } from '@api/middlewares/gql-authorization';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import chalk from 'chalk';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';

import { Server } from '@api/app/server';
import { WebSocketServer } from 'ws';
import { Product } from './product';
import { Shot } from './shot';
export class GQLService {
  public static pubSub = new PubSub();

  private static schema = {
    typeDefs: `
        type Query{
            ${Product.queries}
            ${Shot.queries}
        }
        type Mutation{
          ${Shot.mutations}
        }
        type Subscription {
          ${Shot.subscriptions}
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
      Subscription: {
        ...Shot.resolvers.subcriptions,
      },
    },
  };

  public static async init() {
    const httpServer = Server.instance.server;
    const schema = makeExecutableSchema({
      typeDefs: GQLService.schema.typeDefs,
      resolvers: GQLService.schema.resolvers,
    });
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/api/v1/gql',
    });
    const serverCleanup = useServer(
      {
        schema,
        context: async () => {
          return '';
        },
        onConnect: () => {
          console.log(
            chalk.magenta.bold('Connected to ws://localhost:8080/api/v1/gql')
          );
        },
        onDisconnect() {
          chalk.green.bold('Disconnected to ws://localhost:8080/api/v1/gql');
        },
      },
      wsServer
    );

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });
    await server.start();
    return expressMiddleware(server, {
      context: withContext,
    });
  }
}
