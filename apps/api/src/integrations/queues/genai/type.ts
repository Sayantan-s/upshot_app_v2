import { Product, Shot } from '@prisma/client';

export type IGenaiPost = Pick<Shot, 'title' | 'content'>;

export type MessageQueueInput = Partial<
  Pick<Product, 'productName' | 'productMoto' | 'productDescription'> & {
    productId: string;
  }
>;
