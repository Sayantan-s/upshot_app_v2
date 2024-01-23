import H from '@api/helpers/ResponseHelper';
import { OpenApi } from '@api/integrations/openai';
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
    } ;

    // Create a product in DB and set it's status in 'PENDING' | 'CREATED'

    if (generateProductDescription) {
      const description = await OpenApi.client.completions.create({
        model: 'text-davinci-003',
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
      // Call a serverless function
    }

    H.success(res, {
      statusCode: 200,
      data: responsePayload,
    });
  };
}
