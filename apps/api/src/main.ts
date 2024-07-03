import { Server } from '@api/app/server';
import type { SessionData } from 'express-session';
import type { Session } from 'node:inspector';
import Controllers from './controller';
import Middlewares from './middlewares';

declare module 'express-session' {
  interface SessionData {
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

  // Server.serveFrontend();

  // Middlewares [:: Common]
  Middlewares.commonMiddlewares(app);

  // GraphQL API Endpoint
  await Controllers.GraphqlControllers(app);

  // Middlewares [:: REST Specific middlewares]
  Middlewares.restMiddlewares(app);

  // REST API Endpoints
  Controllers.RestControllers(app);

  // Middleware [:: Errors]
  Middlewares.errorHandlingMiddleware(app);
}

main();
