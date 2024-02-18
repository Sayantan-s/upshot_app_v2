import { Server } from '@api/app/server';
import { SessionData } from 'express-session';
import { Session } from 'inspector';
import Controllers from './controller';
import { MESSAGE_CALL_GENPOST_FN } from './enums/pubsub';
import Middlewares from './middlewares';
import PubSub from './services/pubsub';

export interface IRedisPubSubKeyNames {
  redis_message_called_serveless_fn: boolean;
}
declare module 'express-session' {
  interface SessionData extends IRedisPubSubKeyNames {
    user_id: string;
  }
}

declare module 'node:http' {
  interface IncomingMessage {
    session: Session & SessionData;
  }
}

async function main() {
  const { app } = Server.init();

  PubSub.init([
    {
      channel: MESSAGE_CALL_GENPOST_FN,
      keyName: 'redis_message_called_serveless_fn',
    },
  ]);

  // Middlewares [:: Common]
  Middlewares.commonMiddlewares(app);

  // GraphQL API Endpoint
  Controllers.GraphqlControllers(app);

  // Middlewares [:: REST Specific middlewares]
  Middlewares.restMiddlewares(app);

  // REST API Endpoints
  Controllers.RestControllers(app);

  // Middleware [:: Errors]
  Middlewares.errorHandlingMiddleware(app);
}

main();
