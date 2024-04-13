import { z } from 'zod';

export const RegisterReqSchema = z.object({
  username: z
    .string()
    .min(5, 'Username is too short! (Minimum 5 letters, please!)'),
  pwd: z.string().min(8, 'Password must be 8 characters long'),
  email: z.string().email('Invalid Email'),
});

export const LoginReqSchema = z.object({
  identity: z.string().email() || z.string(),
  pwd: z.string().min(8, 'Password must be 8 characters long'),
});
