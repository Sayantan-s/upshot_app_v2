import { Product } from '@prisma/client';

export interface IGenaiPost {
  id: string;
  title: string;
  content: string;
}

export type MessageQueueInput = Partial<
  Pick<Product, 'productName' | 'productMoto' | 'productDescription'> & {
    productId: string;
  }
>;
