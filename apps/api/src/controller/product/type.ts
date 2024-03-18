import { Product } from '@prisma/client';
import { RequestHandler } from 'express';

// Product Create
export type IProductCreateBody = Pick<Product, 'productName' | 'productMoto'>;

export type IProductCreateHandler = RequestHandler<
  unknown,
  unknown,
  Partial<IProductCreateBody>
>;

// Product Update

export type IProductUpdateBody = Omit<Product, 'id'>;

export type IProductUpdateHandler = RequestHandler<
  { productId: string },
  unknown,
  Partial<IProductUpdateBody>
>;

// Product Fetch

export type IProductFetchHandler = RequestHandler<
  { productId: string },
  unknown
>;
