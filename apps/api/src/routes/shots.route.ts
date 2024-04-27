import { ShotController } from '@api/controller/shots';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { shotSchdlExecSchema } from '@api/validation/shots/shots';
import express from 'express';

const shotRouter = express.Router();

shotRouter.get(
  '/',
  // validate(fetchTrgtProdShtSchema),
  ErrorHandler.tryCatch(ShotController.fetchTargetProductShots)
);

shotRouter.route('/:shotId').get(ShotController.fetchShot);

shotRouter
  .route('/:shotId/schedule')
  .post(ShotController.shotScheduleRegistrationHandler);

shotRouter.post(
  '/schedule/webhook',
  validate(shotSchdlExecSchema),
  ShotController.shotScheduleExecutor
);

shotRouter
  .route('/schedule/:productId/all')
  .post(ShotController.shotScheduleAllRegistrationHandler);

export default shotRouter;
