import H from '@api/helpers/ResponseHelper';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import chalk from 'chalk';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class ErrorHandler extends Error {
  statusCode?: number;
  constructor(status: number, message?: string) {
    super();
    this.statusCode = status;
    this.message = message || "Something wen't wrong";
  }

  public static withErrorHandler(target) {
    const originalMethods = Object.getOwnPropertyNames(target.prototype);

    originalMethods.forEach((methodName) => {
      if (
        methodName !== 'constructor' &&
        typeof target.prototype[methodName] === 'function'
      ) {
        const originalMethod = target.prototype[methodName];
        target.prototype[methodName] = function (...args: unknown[]) {
          return ErrorHandler.tryCatch(originalMethod.apply(this, args));
        };
      }
    });
  }

  static tryCatch(controller: RequestHandler) {
    const catcher: RequestHandler = async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
    return catcher;
  }
  static handle(
    err: ErrorHandler,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) {
    console.log(chalk.red(err));
    if (err instanceof JsonWebTokenError) {
      H.error(res, {
        statusCode: 401,
        data: {
          name: err.name,
          message: err.message,
        },
      });
      return;
    }
    if (err instanceof PrismaClientKnownRequestError) {
      H.error(res, {
        statusCode: 404,
        data: {
          type: 'Prisma Error',
          name: err.name,
          message: err.meta?.message,
        },
      });
      return;
    }
    if (err instanceof PrismaClientUnknownRequestError) {
      H.error(res, {
        statusCode: 404,
        data: {
          type: 'Prisma Error',
          name: err.name,
          message: err.message,
        },
      });
      return;
    }
    H.error(res, {
      statusCode: err.statusCode || 404,
      data: err.message,
    });
  }
}
