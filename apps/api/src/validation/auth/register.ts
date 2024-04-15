import { AnyZodObject, z } from 'zod';

export const RegisterReqSchema: AnyZodObject = z.object({
  username: z
    .string({ required_error: 'Username Required!' })
    .min(5, 'Username is too short! (Minimum 5 letters, please!)'),
  pwd: z.string().min(8, 'Password must be atleast 8 characters long'),
  email: z.string().email('Invalid Email'),
});
