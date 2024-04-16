import { MESSAGE_CALL_GENPOST_FN } from '@api/enums/pubsub';
import { OnboardingShotCreationStatus } from '@api/enums/shot';
import H from '@api/helpers/ResponseHelper';
import { OpenApi } from '@api/integrations/openai';
import GenaiQueue from '@api/integrations/queues/genai/queue';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { v4 as uuid } from 'uuid';
import { IProductInputGenerationHandler, IResponsePayload } from './types';
import { z } from 'zod';
import ErrorHandler from '@api/middlewares/error';

const GenAIBodySchema = z.object({
  productMoto: z.string(),
  productName: z.string(),
  setupInitialFiveAutomatedPosts: z.boolean().optional(),
  generateProductDescription: z.boolean().optional(),
});

export class GenAiController {
  public static generateProductOnboarding: IProductInputGenerationHandler =
    async (req, res) => {
      const {
        productMoto,
        productName,
        setupInitialFiveAutomatedPosts,
        generateProductDescription,
      } = req.body;
      const validBody = GenAIBodySchema.safeParse({
        productMoto,
        productName,
        setupInitialFiveAutomatedPosts,
        generateProductDescription,
      }).success;
      if (!validBody) throw new ErrorHandler(400, 'Invalid Request Body!!');

      const userId = req.session.user_id;

      const responsePayload: Partial<IResponsePayload> = {
        startedSettingUpAutomatedPosts: false,
        productId: null,
      };

      // Task 1:: Create a product in database
      const product = await ProductService.create({
        productMoto,
        productName,
        user: {
          connect: {
            id: userId,
          },
        },
      });

      responsePayload.productId = product.id;

      if (generateProductDescription) {
        // Task 2:: Generate a product description using ai if checked from UI
        const description = await OpenApi.client.completions.create({
          model: 'gpt-3.5-turbo-instruct',
          prompt: `
        Generate a 50 words product decription according to the below inputs:
        productName: ${productName}
        productMoto: ${productMoto}
      `,
          stream: false,
          temperature: 0.3,
          max_tokens: 50,
        });
        responsePayload.description = description.choices[0].text;
      }

      if (setupInitialFiveAutomatedPosts) {
        // Task 3:: Call the firebase cloud function to generate 5 posts behind the scenes using bullMQ
        responsePayload.startedSettingUpAutomatedPosts = true;
        responsePayload.messageId = await GenaiQueue.client.produce(
          MESSAGE_CALL_GENPOST_FN,
          {
            productMoto,
            productName,
            productId: responsePayload.productId,
            ...(responsePayload.description
              ? { productDescription: responsePayload.description }
              : {}),
          }
        );
        const keyName = `${responsePayload.productId}_generateProductOnboarding`;
        await Redis.client.cache.set(
          keyName,
          OnboardingShotCreationStatus.CREATING
        );
      }

      res.cookie('onboarding-session', uuid());

      H.success(res, {
        statusCode: 200,
        data: responsePayload,
      });
    };
}
