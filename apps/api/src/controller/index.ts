import { CLIENT_ORIGIN } from '@api/config';
import { GQLService } from '@api/integrations/graphql';
import { AuthMiddleware } from '@api/middlewares/auth';
import authRouter from '@api/routes/auth.route';
import genAiRouter from '@api/routes/genAi.route';
import mediaRouter from '@api/routes/media.route';
import productRouter from '@api/routes/product.route';
import cors from 'cors';
import { Express } from 'express';

export default class Controllers {
  static RestControllers(app: Express) {
    app.use('/api/v1/auth', authRouter);

    app.use(AuthMiddleware.withAuthorization);
    app.use('/api/v1/ai', genAiRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/upload', mediaRouter);
  }

  static async GraphqlControllers(app: Express) {
    const gql = await GQLService.init();
    app.use(
      '/api/v1/gql',
      cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
      }),
      gql
    );
  }
}
