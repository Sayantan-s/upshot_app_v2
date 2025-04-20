import { MESSAGE_POST_GEN } from '@api/enums/pubsub';
import { OnboardingShotCreationStatus } from '@api/enums/shot';
import H from '@api/helpers/ResponseHelper';
import { PostGen } from '@api/integrations/queues/genai/queue';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { v4 as uuid } from 'uuid';
import { IProductInputGenerationHandler, IResponsePayload } from './types';
import { RequestHandler } from 'express';
import { LLM } from '@api/integrations/llm';
import { Type } from '@google/genai';
import { MessageQueue } from '@api/integrations/queues';

export class GenAiController {
  public static generateProductOnboarding: IProductInputGenerationHandler =
    async (req, res) => {
      const { productMoto, productName, setupInitialFiveAutomatedPosts } =
        req.body;
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

      if (setupInitialFiveAutomatedPosts) {
        // Task 2:: Call the LLM to generate 5 posts behind the scenes through a queue.
        const queue = new MessageQueue(PostGen.message_name, PostGen.workerFn);

        queue.produce(MESSAGE_POST_GEN, {
          productMoto,
          productName,
          productId: responsePayload.productId,
        });

        const keyName = `${responsePayload.productId}_generateProductOnboarding`;

        queue.on(MessageQueue.action.POST_PRODUCE, async () => {
          await Redis.client.cache.set(
            keyName,
            OnboardingShotCreationStatus.CREATING
          );
        });

        queue.on(MessageQueue.action.POST_CONSUME, async () => {
          await Redis.client.cache.del(keyName);
        });

        responsePayload.startedSettingUpAutomatedPosts = true;
      }

      res.cookie('onboarding-session', uuid());

      H.success(res, {
        statusCode: 200,
        data: responsePayload,
      });
    };

  public static generateStruturedOps: RequestHandler = async (_, res) => {
    const schema = {
      type: Type.OBJECT,
      required: ['shots'],
      properties: {
        shots: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ['title', 'content'],
            properties: {
              title: {
                type: Type.STRING,
              },
              content: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    };

    const shots = await LLM.generateStructuredOPs({
      model: LLM.models.pro_preview,
      schema,
      prompt: `You are developer adovate promoting your product. Write 5 tweet like posts promoting your product.`,
    });

    return H.success(res, {
      data: shots,
      statusCode: 201,
    });
  };
}
