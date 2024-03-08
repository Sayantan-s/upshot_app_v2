import { MESSAGE_CALL_GENPOST_FN } from '@api/enums/pubsub';
import H from '@api/helpers/ResponseHelper';
import { OpenApi } from '@api/integrations/openai';
import GenaiQueue from '@api/integrations/queues/genai/queue';
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
      // Task 1:: Generate a product description using ai if checked from UI
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
      // Task 2:: Call the firebase cloud function to generate 5 posts behind the scenes using bullMQ
      responsePayload.startedSettingUpAutomatedPosts = true;
      responsePayload.messageId = await GenaiQueue.client.produce(
        MESSAGE_CALL_GENPOST_FN,
        { productMoto, productName }
      );
    }

    H.success(res, {
      statusCode: 200,
      data: responsePayload,
    });
  };
}
