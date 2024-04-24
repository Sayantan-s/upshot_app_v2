import { MediaController } from '@api/controller/media';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { MediaService } from '@api/services/media';
import { MediaFileSchema } from '@api/validation/media/upload';
import express from 'express';

const mediaRouter = express.Router();

mediaRouter.post(
  '/image',
  validate(MediaFileSchema),
  ErrorHandler.tryCatch(MediaService.image.uploadSingle),
  ErrorHandler.tryCatch(MediaController.singleImage)
);

export default mediaRouter;
