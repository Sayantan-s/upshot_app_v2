import { AnyZodObject, z } from 'zod';

export const LoginReqSchema: AnyZodObject = z.object({
  identity: z.string({ required_error: 'Invalid User Name given!' }),
  pwd: z.string().min(8, 'Password must be atleast 8 characters long'),
});
