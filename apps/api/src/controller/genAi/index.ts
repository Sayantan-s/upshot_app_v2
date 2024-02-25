import { IProductStatus } from '@api/enums/product';
import H from '@api/helpers/ResponseHelper';
import { OpenApi } from '@api/integrations/openai';
import { redis } from '@api/integrations/redis';
import { v4 as uuid } from 'uuid';
import { IProductInputGenerationHandler, IResponsePayload } from './types';

export class GenAiController {
  public static generateProductInputs: IProductInputGenerationHandler = async (
    req,
    res
  ) => {
    const {
      productMoto,
      productName,
      setupInitialFiveAutomatedPosts,
      generateProductDescription,
    } = req.body;

    const responsePayload: Partial<IResponsePayload> = {
      startedSettingUpAutomatedPosts: false,
    };

    if (generateProductDescription) {
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
      responsePayload.startedSettingUpAutomatedPosts = true;
      req.session.redis_message_called_serveless_fn = true;
    }

    // Create a product in your in memory cache and set it's status in 'PENDING'

    const temporaryProductIdentity = uuid();

    await redis.set(
      temporaryProductIdentity,
      JSON.stringify({
        productMoto,
        productName,
        status: IProductStatus.PENDING,
        description: responsePayload.description || '',
      })
    );

    H.success(res, {
      statusCode: 200,
      data: { ...responsePayload, temporaryProductIdentity },
    });
  };
}
