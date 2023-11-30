import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export class GQLService {
  public static async init() {
    const server = new ApolloServer({
      typeDefs: `#graphql
        type Query{
            health: String   
        }
      `,
      resolvers: {
        Query: {
          health: () => `World!`,
        },
      },
    });
    await server.start();
    return expressMiddleware(server);
  }
}
