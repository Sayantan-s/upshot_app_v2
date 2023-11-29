// User registration types

import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface IRegistrationBody {
  email: string;
  userName: string;
  pwd: string;
}

export interface IRegistrationResponse {
  accessToken: string;
}

export type IRegistrationRequestHandler = RequestHandler<
  unknown,
  unknown,
  Partial<IRegistrationBody>
>;

// Easy Access Types

export type IEasyAccessBody = Pick<IRegistrationBody, "email">;
export type IEasyAccessHandler = RequestHandler<
  unknown,
  unknown,
  Partial<IEasyAccessBody>
>;
export type IEasyAccessResponse = IRegistrationResponse;

// User login types

export type ILoginBody = { identity: string } & Pick<IRegistrationBody, "pwd">;

export type ILoginResponse = IRegistrationResponse;

export type ILoginRequestHandler = RequestHandler<
  unknown,
  unknown,
  Partial<ILoginBody>
>;

// Handle RefreshToken Types

export type TokenPayload = Pick<User, "newUser" | "userName" | "email" | "id">;

export type JWTMetaData = TokenPayload & JwtPayload;

export interface ICookies {
  token: string;
}

export type IHandleRefreshTokenResponse = IRegistrationResponse;

// Get User

export type IGetUserRequestHandler = RequestHandler;
