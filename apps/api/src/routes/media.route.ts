import ErrorHandler from '@api/middlewares/error';
import { MediaService } from '@api/services/media';
import express from 'express';

const mediaRouter = express.Router();

mediaRouter.route('/audio').post(
  ErrorHandler.tryCatch(MediaService.image.uploadSingle)
  // ErrorHandler.tryCatch(MediaController.audio)
);

export default mediaRouter;
