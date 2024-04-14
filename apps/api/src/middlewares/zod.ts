import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';

export const RegisterReqSchema: AnyZodObject = z.object({
  username: z
    .string()
    .min(5, 'Username is too short! (Minimum 5 letters, please!)'),
  pwd: z.string().min(8, 'Password must be 8 characters long'),
  email: z.string().email('Invalid Email'),
});

export const LoginReqSchema: AnyZodObject = z.object({
  identity: z.string().email() || z.string(),
  pwd: z.string().min(8, 'Password must be 8 characters long'),
});

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

export const validate =
  (schema: AnyZodObject): NextFunction | object =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
