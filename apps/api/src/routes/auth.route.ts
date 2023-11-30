import { AuthController } from '@api/controller/auth';
import { AuthMiddleware } from '@api/middlewares/auth';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const authRouter = express.Router();

authRouter
  .route('/register')
  .post(ErrorHandler.tryCatch(AuthController.register));

authRouter.route('/login').post(ErrorHandler.tryCatch(AuthController.login));

authRouter
  .route('/refresh')
  .get(ErrorHandler.tryCatch(AuthController.handleRefreshToken));

authRouter
  .route('/easy')
  .post(ErrorHandler.tryCatch(AuthController.easyAccess));

authRouter.route('/logout').post(ErrorHandler.tryCatch(AuthController.logout));

// Needs Authorization

authRouter.use(AuthMiddleware.withAuthorization);

authRouter.route('/user').get(ErrorHandler.tryCatch(AuthController.getUser));

export default authRouter;
