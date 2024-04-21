import { CLIENT_ORIGIN } from '@api/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { AuthMiddleware } from './auth';
import ErrorHandler from './error';
import { sessionMiddleWare } from './session';
import swagger from './swagger';

export default class Middlewares {
  static commonMiddlewares(app: Express) {
    app.use(morgan('dev'));
    app.use(express.json());
  }

  static restMiddlewares(app: Express) {
    app.use(express.urlencoded({ extended: false }));
    app.use(swagger);
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
  }

  static errorHandlingMiddleware(app: Express) {
    app.use(ErrorHandler.handle);
  }
}
