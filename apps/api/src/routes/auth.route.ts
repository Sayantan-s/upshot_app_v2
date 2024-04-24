import { AuthController } from '@api/controller/auth';
import { AuthMiddleware } from '@api/middlewares/auth';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { easyBodySchema } from '@api/validation/auth/easy';
import { LoginReqSchema } from '@api/validation/auth/login';
import { RegisterReqSchema } from '@api/validation/auth/register';
import express from 'express';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validate(RegisterReqSchema),
  ErrorHandler.tryCatch(AuthController.register)
);

authRouter.post(
  '/login',
  validate(LoginReqSchema),
  ErrorHandler.tryCatch(AuthController.login)
);

authRouter
  .route('/refresh')
  .get(ErrorHandler.tryCatch(AuthController.handleRefreshToken));

authRouter.post(
  '/easy',
  validate(easyBodySchema),
  ErrorHandler.tryCatch(AuthController.easyAccess)
);

authRouter.route('/logout').post(ErrorHandler.tryCatch(AuthController.logout));

// Needs Authorization

authRouter.use(AuthMiddleware.withAuthorization);

authRouter.route('/user').get(ErrorHandler.tryCatch(AuthController.getUser));

export default authRouter;
