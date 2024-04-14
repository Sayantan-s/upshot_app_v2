import { GenAiController } from '@api/controller/genAi';
import ErrorHandler from '@api/middlewares/error';
import { GenAIBodySchema, validate } from '@api/middlewares/zod';
import express, { NextFunction } from 'express';

const genAiRouter = express.Router();

genAiRouter.post(
  '/onboarding_generation',
  ErrorHandler.tryCatch((validate(GenAIBodySchema) as NextFunction) || Object),
  ErrorHandler.tryCatch(GenAiController.generateProductOnboarding)
);

export default genAiRouter;
