import { ShotController } from '@api/controller/shots';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import {
  fetchTrgtProdShtSchema,
  shotRegHndlerSchema,
  shotSchdlExecSchema,
} from '@api/validation/shots/shots';
import express from 'express';

const shotRouter = express.Router();

shotRouter.get(
  '/',
  validate(fetchTrgtProdShtSchema),
  ErrorHandler.tryCatch(ShotController.fetchTargetProductShots)
);

shotRouter.post(
  '/:shotId/schedule',
  validate(shotRegHndlerSchema),
  ShotController.shotScheduleRegistrationHandler
);

shotRouter.post(
  '/schedule/webhook',
  validate(shotSchdlExecSchema),
  ShotController.shotScheduleExecutor
);

shotRouter
  .route('/schedule/:productId/all')
  .post(ShotController.shotScheduleAllRegistrationHandler);

export default shotRouter;
