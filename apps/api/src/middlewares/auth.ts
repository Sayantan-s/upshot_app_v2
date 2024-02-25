import { API_KEY } from '@api/config';
import { AuthService } from '@api/services/auth';
import { RequestHandler } from 'express';
import ErrorHandler from './error';
import { SocketMiddleware } from './session';

export class AuthMiddleware {
  public static withAuthorization: RequestHandler = ErrorHandler.tryCatch(
    async (req, _, next) => {
      const access_token = req.headers['authorization']?.split(' ')[1];
      if (!access_token) throw new ErrorHandler(401, 'Not Authorized');
      const { id } = await AuthService.jwt.verifyAccessToken(access_token);
      req.session.user_id = id;
      next();
    }
  );

  public static withApiKeys: RequestHandler = ErrorHandler.tryCatch(
    async (req, _, next) => {
      const apikey =
        req.headers.accept === 'text/event-stream'
          ? req.query.api_key
          : req.headers['x-api-key'];
      if (!apikey || apikey !== API_KEY)
        throw new ErrorHandler(403, 'Access Denied. Invalid API_KEY.');
      next();
    }
  );
}

export const withApiKeysSocket: SocketMiddleware = async (socket, next) => {
  const apikey = socket.handshake.auth['X-API-KEY'];
  if (!apikey || apikey !== API_KEY)
    throw new ErrorHandler(403, 'Access Denied. Invalid API_KEY.');
  next();
};

export const withAuthSocket: SocketMiddleware = async (socket, next) => {
  next();
};
