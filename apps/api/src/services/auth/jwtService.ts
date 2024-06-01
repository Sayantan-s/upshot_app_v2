/* eslint-disable @typescript-eslint/ban-types */
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@api/config';
import { JWTMetaData } from '@api/controller/auth/types';
import jwt from 'jsonwebtoken';
import { ISignAccessTokenParams, ISignRefreshTokenParams } from './types';
export class JWTService {
  public static COOKIE_EXPIRY = 24 * 60 * 60 * 1000;

  public static signAccessToken<TMetaData extends {}>({
    payload,
    expiresIn,
  }: ISignAccessTokenParams<TMetaData>) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
      expiresIn: expiresIn || '300s',
    });
  }

  public static signRefreshToken<TMetaData extends {}>({
    payload,
    expiresIn,
  }: ISignRefreshTokenParams<TMetaData>) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
      expiresIn: expiresIn || '7d',
    });
  }

  public static async verifyAccessToken(token: string): Promise<JWTMetaData> {
    const result = jwt.verify(token, ACCESS_TOKEN_SECRET!) as JWTMetaData;
    return result;
  }

  public static async verifyRefreshToken(token: string): Promise<JWTMetaData> {
    return jwt.verify(token, REFRESH_TOKEN_SECRET!) as JWTMetaData;
  }
}
