import { ShotController } from '@api/controller/shots';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const shotRouter = express.Router();

shotRouter
  .route('/')
  .get(ErrorHandler.tryCatch(ShotController.fetchTargetProductPosts));

shotRouter.route('/schedule/webhook').post(ShotController.shotScheduleExecutor);

shotRouter
  .route('/schedule/:productId/all')
  .post(ShotController.shotScheduleAllRegistrationHandler);

shotRouter
  .route('/schedule/:shotId')
  .post(ShotController.shotScheduleRegistrationHandler);

export default shotRouter;
