import H from '@api/helpers/ResponseHelper';
import { NextFunction, Request, Response } from 'express';
import { ZodAny, ZodEffects, z } from 'zod';

export const validate =
  (
    schema:
      | z.AnyZodObject
      | z.ZodOptional<z.AnyZodObject>
      | ZodEffects<ZodEffects<ZodAny>>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      H.error(res, {
        statusCode: 400,
        data: {
          message: 'Invalid Request Schema',
        },
      });
    }
  };
