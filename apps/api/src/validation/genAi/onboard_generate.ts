import { AnyZodObject, z } from 'zod';

export const GenAIBodySchema: AnyZodObject = z.object({
  productMoto: z
    .string({ required_error: 'Product Moto is mandatory' })
    .min(20, 'Atleast 20 characters of product moto'),
  productName: z
    .string({ required_error: 'Product Name is mandatory' })
    .min(4, 'Product Name too short!'),
  setupInitialFiveAutomatedPosts: z.boolean().optional(),
  generateProductDescription: z.boolean().optional(),
});
