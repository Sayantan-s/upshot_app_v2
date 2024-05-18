import { z, AnyZodObject } from 'zod';

export const createProdSchema: AnyZodObject = z.object({
  productMoto: z.string({ required_error: 'Product Motto Required!' }),
  productName: z.string({ required_error: 'Product Name is Required!' }),
});

export const fetchProdSchema: AnyZodObject = z.object({
  productId: z.string({ required_error: 'Product ID required!' }),
});

export const updateProdBodySchema = ''; //data = Partial<IUpdateBody> without id

export const updateProdParamSchema: AnyZodObject = z.object({
  productId: z.string({ required_error: 'Product ID error !' }),
});

export const finaliseProdParamSchema: AnyZodObject = z.object({
  productId: z.string({ required_error: 'Product ID required!' }),
});
