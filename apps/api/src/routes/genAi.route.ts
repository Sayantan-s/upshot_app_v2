import { GenAiController } from '@api/controller/genAi';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { GenAIBodySchema } from '@api/validation/genAi/onboard_generate';
import express, { NextFunction } from 'express';

const genAiRouter = express.Router();

genAiRouter.post(
  '/onboarding_generation',
  ErrorHandler.tryCatch((validate(GenAIBodySchema) as NextFunction) || Object),
  ErrorHandler.tryCatch(GenAiController.generateProductOnboarding)
);

export default genAiRouter;
