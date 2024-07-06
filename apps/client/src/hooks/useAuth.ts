import { useSelector } from '@client/store';
import type { User } from '@client/store/types/auth';

export interface JwtPayload {
  exp?: number | undefined;
  iat?: number | undefined;
}

export type TokenPayload = Pick<User, 'newUser' | 'userName' | 'email' | 'id'>;

type JWTMetaData = TokenPayload & JwtPayload;

export const parseJWTToken = (accessToken: string): JWTMetaData =>
  JSON.parse(atob(accessToken.split('.')[1]));

export const useAuth = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const decodedToken = accessToken ? parseJWTToken(accessToken) : null;

  return {
    isAuthenticated: decodedToken?.exp
      ? new Date(decodedToken?.exp).getTime() - Date.now() / 1000 > 0
      : false,
    token: accessToken,
    tokenMetaData: decodedToken,
    user,
  };
};
