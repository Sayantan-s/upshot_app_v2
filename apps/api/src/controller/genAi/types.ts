import { Product } from '@prisma/client';
import { RequestHandler } from 'express';

export type IProductInputGenerationBody = Pick<
  Product,
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
  productId: string;
}
