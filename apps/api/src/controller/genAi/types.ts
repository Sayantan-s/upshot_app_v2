import { Build_In_Public } from '@prisma/client';
import { RequestHandler } from 'express';

export type IProductInputGenerationBody = Pick<
  Build_In_Public,
  'productName' | 'productMoto'
> & {
  setupInitialFiveAutomatedPosts: boolean;
  generateProductDescription: boolean;
};

export type IProductInputGenerationHandler = RequestHandler<
  unknown,
  unknown,
  Partial<IProductInputGenerationBody>
>;

export interface IResponsePayload {
  description: string;
  logo?: string;
  startedSettingUpAutomatedPosts?: boolean;
  messageId?: string;
}
