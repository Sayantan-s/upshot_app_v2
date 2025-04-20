import { Product, Shot } from '@prisma/client';

export type IGenaiPost = Pick<Shot, 'title' | 'content'>;

export type PostGenInput = Partial<
  Pick<Product, 'productName' | 'productMoto' | 'productDescription'> & {
    productId: string;
  }
>;

export type PostGenOutput = {
  shots: Array<Pick<Shot, 'title' | 'content'>>;
};
