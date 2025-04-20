import { RichText } from '@api/helpers/RichTextEditor';
import { CreationMethod, ProductStatus, ShotStatus } from '@prisma/client';
import { JobFn } from '../type';
import { LLM } from '@api/integrations/llm';
import { Type } from '@google/genai';
import prisma from '@api/integrations/prisma';
import { PostGenInput, PostGenOutput } from './type';

export class PostGen {
  static message_name = PostGen.name.toLowerCase();
  private static systemPrompt = `
  You are developer adovcate of big opensource startup/organization similar to cal.com etc.
  Your work is to write technical posts and promotional tweets about the products your company builds.
  `;
  private static schema = {
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
  static workerFn: JobFn<PostGenInput> = async (job) => {
    const genPostMetaData = job.data;
    const res = await LLM.generateStructuredOPs<PostGenOutput>({
      prompt: PostGen.createPrompt(genPostMetaData),
      model: LLM.models.pro_preview,
      schema: PostGen.schema,
      systemPrompt: PostGen.systemPrompt,
    });

    const payload = res.shots.map((payload) => ({
      ...payload,
      content: RichText.generate(payload.content),
      status: ShotStatus.IDLE,
      productType: ProductStatus.IDLE,
      creationMethod: CreationMethod.GEN_AI,
      productId: job.data.productId,
    }));

    await prisma.shot.createMany({ data: payload });
  };

  private static createPrompt(input: PostGenInput) {
    let basePrompt = `
      You are tasked to write 5 pre-release kind of tweets for your current product named: ${input.productName}.

      A little brief or motto what the product's gonna be: \n${input.productName}
    `;

    if (input.productDescription)
      basePrompt += `\n
      A more detailed description of the product gonna be: \n${input.productDescription}
    `;

    return basePrompt;
  }
}
