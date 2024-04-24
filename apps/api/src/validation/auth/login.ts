import { AnyZodObject, z } from 'zod';

export const LoginReqSchema: AnyZodObject = z.object({
  identity: z.string().email() || z.string(),
  pwd: z.string().min(8, 'Password must be atleast 8 characters long'),
});
