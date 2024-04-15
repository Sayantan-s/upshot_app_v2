import { AuthController } from '@api/controller/auth';
import { AuthMiddleware } from '@api/middlewares/auth';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { LoginReqSchema } from '@api/validation/auth/login';
import { RegisterReqSchema } from '@api/validation/auth/register';
import express, { NextFunction } from 'express';

const authRouter = express.Router();

authRouter.post(
  '/register',
  ErrorHandler.tryCatch(
    (validate(RegisterReqSchema) as NextFunction) || Object
  ),
  ErrorHandler.tryCatch(AuthController.register)
);

authRouter.post(
  '/login',
  ErrorHandler.tryCatch((validate(LoginReqSchema) as NextFunction) || Object),
  ErrorHandler.tryCatch(AuthController.login)
);

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
