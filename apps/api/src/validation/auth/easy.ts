import { AnyZodObject, z } from 'zod';

export const easyBodySchema: AnyZodObject = z.object({
  email: z
    .string({ required_error: 'Email is Required!' })
    .email({ message: 'Invalid Email!' }),
});
