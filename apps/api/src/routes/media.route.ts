import { MediaController } from '@api/controller/media';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { MediaService } from '@api/services/media';
import { MediaFileSchema } from '@api/validation/media/upload';
import express, { NextFunction } from 'express';

const mediaRouter = express.Router();

mediaRouter.post(
  '/image',
  ErrorHandler.tryCatch(MediaService.image.uploadSingle),
  ErrorHandler.tryCatch((validate(MediaFileSchema) as NextFunction) || Object),
  ErrorHandler.tryCatch(MediaController.singleImage)
);

export default mediaRouter;
