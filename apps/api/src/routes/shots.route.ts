import { ShotController } from '@api/controller/shots';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const shotRouter = express.Router();

shotRouter
  .route('/')
  .get(ErrorHandler.tryCatch(ShotController.fetchTargetProductShots))
  .post(ErrorHandler.tryCatch(ShotController.addNewShot));

shotRouter
  .route('/:shotId/schedule')
  .post(ShotController.shotScheduleRegistrationHandler);

shotRouter.route('/schedule/webhook').post(ShotController.shotScheduleExecutor);

shotRouter
  .route('/schedule/:productId/all')
  .post(ShotController.shotScheduleAllRegistrationHandler);

export default shotRouter;
