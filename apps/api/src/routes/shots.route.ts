import { ShotController } from '@api/controller/shots';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const shotRouter = express.Router();

shotRouter
  .route('/')
  .get(ErrorHandler.tryCatch(ShotController.fetchTargetProductPosts));

export default shotRouter;
