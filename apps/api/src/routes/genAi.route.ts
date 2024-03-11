import { GenAiController } from '@api/controller/genAi';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const genAiRouter = express.Router();

genAiRouter
  .route('/onboarding_generation')
  .post(ErrorHandler.tryCatch(GenAiController.generateProductOnboarding));

export default genAiRouter;
