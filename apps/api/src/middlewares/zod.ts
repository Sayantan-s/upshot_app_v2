import H from '@api/helpers/ResponseHelper';
import { NextFunction, Request, Response } from 'express';
import { ZodAny, ZodEffects, z } from 'zod';

// export const validate =
//   (
//     schema:
//       | AnyZodObject
//       | z.ZodEffects<z.ZodEffects<z.ZodAny, unknown, unknown>, unknown, unknown>
//   ) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//         file: req.file,
//       });
//       next();
//     } catch (error) {
//       H.error(res, {
//         statusCode: 400,
//         data: {
//           message: 'Access denied due to wrong request schema!',
//         },
//       });
//     }
//   };

export const validate =
  (
    schema:
      | z.AnyZodObject
      | z.ZodOptional<z.AnyZodObject>
      | ZodEffects<ZodEffects<ZodAny>>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body) await schema.parseAsync(req.body);
      if (req.file) await schema.parseAsync(req.file);
      if (req.params) await schema.parseAsync(req.params);
      if (req.query) await schema.parseAsync(req.query);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError)
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      H.error(res, {
        statusCode: 400,
        data: {
          message: 'Invalid Schema Detected for ' + schema + ' where ' + err,
        },
      });
    }
  };
