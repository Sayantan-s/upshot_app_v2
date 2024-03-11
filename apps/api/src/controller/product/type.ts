import { Product } from '@prisma/client';
import { RequestHandler } from 'express';

export type IProductCreateBody = Pick<Product, 'productName' | 'productMoto'>;

export type IProductCreateHandler = RequestHandler<
  unknown,
  unknown,
  Partial<IProductCreateBody>
>;
