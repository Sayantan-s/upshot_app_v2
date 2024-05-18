import { z, AnyZodObject } from 'zod';

export const fetchTrgtProdShtSchema: AnyZodObject = z.object({
  productId: z.string({ required_error: ' Product ID required!' }),
});

export const shotRegHndlerSchema: AnyZodObject = z.object({
  shotId: z.string({ required_error: 'Shot ID is Required!' }),
});

export const shotSchdlExecSchema: AnyZodObject = z.object({
  shotId: z.string({ required_error: 'Shot ID Required!' }),
  scheduleReference: z.string({
    required_error: 'Schedule Reference Required!',
  }),
});
