import { GenAiController } from '@api/controller/genAi';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { GenAIBodySchema } from '@api/validation/genAi/onboard_generate';
import express from 'express';

const genAiRouter = express.Router();

genAiRouter.post(
  '/onboarding_generation',
  validate(GenAIBodySchema),
  ErrorHandler.tryCatch(GenAiController.generateProductOnboarding)
);

export default genAiRouter;
