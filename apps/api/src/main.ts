import { Server } from '@api/app/server';
import { CLIENT_ORIGIN } from '@api/config';
import { IGenerateCV } from '@api/enums/product';
import { GQLService } from '@api/integrations/graphql';
import { AuthMiddleware } from '@api/middlewares/auth';
import ErrorHandler from '@api/middlewares/error';
import { sessionMiddleWare } from '@api/middlewares/session';
import authRouter from '@api/routes/auth.route';
import genAiRouter from '@api/routes/genAi.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { SessionData } from 'express-session';
import helmet from 'helmet';
import { Session } from 'inspector';
import morgan from 'morgan';

declare module 'express-session' {
  interface SessionData {
    api_GENERATECV_status: IGenerateCV;
  }
}

declare module 'node:http' {
  interface IncomingMessage {
    session: Session & SessionData;
  }
}

async function main() {
  const {
    app,
    // server
  } = Server.init();
  // const io = new IO(server);
  const gql = await GQLService.init();

  // Middlewares [:: Common]
  if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
  app.use(express.json());

  // GraphQL API Endpoint
  app.use('/api/v1/gql', gql);

  // Middlewares [:: REST Specific middlewares]
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: CLIENT_ORIGIN,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(helmet());
  app.use(sessionMiddleWare);
  app.use(AuthMiddleware.withApiKeys);

  // REST API Endpoints
  app.use('/api/v1/auth', authRouter);

  // app.use(AuthMiddleware.withAuthorization);

  app.use('/api/v1/payments', authRouter);
  app.use('/api/v1/ai', genAiRouter);
  // app.use('/api/v1/upload', mediaRouter);

  app.use(ErrorHandler.handle);

  // io.instance.use(withSession(sessionMiddleWare));
  // io.init(IO.execute);
}

main();
