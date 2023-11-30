import { GenAiController } from '@api/controller/genAi';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const genAiRouter = express.Router();

genAiRouter
  .route('/product_inputs')
  .post(ErrorHandler.tryCatch(GenAiController.generateProductInputs));

export default genAiRouter;
