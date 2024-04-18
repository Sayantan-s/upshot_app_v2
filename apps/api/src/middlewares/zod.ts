import H from '@api/helpers/ResponseHelper';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

export const validate =
  (
    schema:
      | AnyZodObject
      | z.ZodEffects<z.ZodEffects<z.ZodAny, unknown, unknown>, unknown, unknown>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
      });
      next();
    } catch (error) {
      H.error(res, {
        statusCode: 400,
        data: {
          message: 'Access denied due to wrong request schema!',
        },
      });
    }
  };
