import { API_KEY } from '@api/config';
import { AuthService } from '@api/services/auth';
import { BaseContext, ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { Request } from 'express';
import { GraphQLError } from 'graphql';

export const withContext: ContextFunction<
  [ExpressContextFunctionArgument],
  BaseContext
> = async ({ req }) => {
  const codegen = req.headers['codegen'];
  if (codegen) return {};
  withApiKeys(req);
  return withAuthorization(req);
};

const withApiKeys = async (req: Request) => {
  const apikey = req.headers['x-api-key'];
  if (!apikey || apikey !== API_KEY)
    throw new GraphQLError('Access Denied. Invalid API_KEY.', {
      extensions: {
        code: 403,
        message: 'Unauthorized',
      },
    });
};

const withAuthorization = async (req: Request) => {
  const access_token = req.headers['authorization']?.split(' ')[1];
  try {
    const userMetaData = await AuthService.jwt.verifyAccessToken(access_token);
    return userMetaData;
  } catch (error) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 401,
        message: 'Unauthorized',
      },
    });
  }
};
