import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';

export const validate =
  (
    schema:
      | AnyZodObject
      | z.ZodEffects<z.ZodEffects<z.ZodAny, unknown, unknown>, unknown, unknown>
  ): NextFunction | object =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
