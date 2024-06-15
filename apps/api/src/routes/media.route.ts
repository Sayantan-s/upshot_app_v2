import { MediaController } from '@api/controller/media';
import ErrorHandler from '@api/middlewares/error';
import { MediaService } from '@api/services/media';
import express from 'express';

const mediaRouter = express.Router();

mediaRouter.post(
  '/image',
  ErrorHandler.tryCatch(MediaService.image.uploadSingle),
  // validate(MediaFileSchema),
  ErrorHandler.tryCatch(MediaController.singleImage)
);

export default mediaRouter;
