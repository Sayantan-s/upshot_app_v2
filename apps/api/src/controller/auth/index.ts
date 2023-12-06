import { FREE_ACCESS_EMAIL } from '@api/config';
import H from '@api/helpers/ResponseHelper';
import ErrorHandler from '@api/middlewares/error';
import { AuthService } from '@api/services/auth';
import { UserService } from '@api/services/users';
import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import {
  ICookies,
  IEasyAccessHandler,
  IEasyAccessResponse,
  IGetUserRequestHandler,
  IHandleRefreshTokenResponse,
  ILoginRequestHandler,
  ILoginResponse,
  IRegistrationRequestHandler,
  IRegistrationResponse,
} from './types';
export class AuthController {
  // FOR REGISTERING USERS!
  public static register: IRegistrationRequestHandler = async (req, res) => {
    const { userName, pwd, email } = req.body;
    if (!userName || !pwd || !email)
      throw new ErrorHandler(400, 'username, email and password is required!');
    const isDuplicateUser = await UserService.userExists({ userName, email });
    if (isDuplicateUser) throw new ErrorHandler(409, 'user already exists!');
    const hashedPassword = await AuthService.pwd.hash(pwd); // Hash password using bcrypt
    const { newUser, id } = await UserService.createUser({
      userName,
      pwd: hashedPassword,
      email,
    });
    const [accessToken, refreshToken] = [
      AuthService.jwt.signAccessToken({
        payload: { userName, email, newUser, id },
      }),
      AuthService.jwt.signRefreshToken({
        payload: { userName, email, newUser, id },
      }),
    ];
    await UserService.updateUser(
      { id },
      {
        refresh_token: refreshToken,
      }
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: AuthService.jwt.COOKIE_EXPIRY,
      secure: true,
      sameSite: 'none',
    });
    req.session.user_id = id;
    H.success<IRegistrationResponse>(res, {
      statusCode: 201,
      data: { accessToken },
    });
  };

  // FOR LOGGING IN USERS!
  public static login: ILoginRequestHandler = async (req, res) => {
    const { pwd, identity } = req.body;
    if (!identity || !pwd)
      throw new ErrorHandler(400, 'username or password entered is incorrect!');
    // eslint-disable-next-line no-useless-escape
    const isEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(identity); // Regex to check if it is "email" or "userName"
    const user = await UserService.getUser(
      {
        [isEmail ? 'email' : 'userName']: identity,
      },
      { pwd: true, email: true, userName: true, newUser: true }
    );
    if (!user) throw new ErrorHandler(401, 'user is not registered!');
    const isMatched = await AuthService.pwd.match(pwd, user.pwd); // Hash password using bcrypt
    if (isMatched) {
      const [accessToken, refreshToken] = [
        AuthService.jwt.signAccessToken({
          payload: {
            userName: user.userName,
            email: user.email,
            newUser: user.newUser,
            id: user.id,
          },
        }),
        AuthService.jwt.signRefreshToken({
          payload: {
            userName: user.userName,
            email: user.email,
            newUser: user.newUser,
            id: user.id,
          },
        }),
      ];
      await UserService.updateUser(
        {
          id: user.id,
        },
        {
          ...(user.newUser ? { newUser: false } : {}), // Will update this only when the user is "new User" = true
          refresh_token: refreshToken,
        }
      );
      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: AuthService.jwt.COOKIE_EXPIRY,
        secure: true,
        sameSite: 'none',
      });
      H.success<ILoginResponse>(res, {
        statusCode: 201,
        data: { accessToken },
      });
    } else
      throw new ErrorHandler(401, 'username or password entered is incorrect!');
  };

  public static logout: RequestHandler = async (req, res) => {
    const cookies = req.cookies as ICookies;
    if (!cookies.token) {
      return H.success(res, { statusCode: 204 });
    }
    const user = await UserService.getUser({
      refresh_token: cookies.token,
    });
    if (!user) {
      res.clearCookie('token', { httpOnly: true });
      return H.success(res, { statusCode: 204 });
    }
    await UserService.updateUser(
      { id: user.id },
      {
        refresh_token: '',
      }
    );
    res.clearCookie('token', { httpOnly: true });
    H.success(res, { statusCode: 204 });
  };
  // FOR REFRESHING ACCESS_TOKEN by sending REFRESH_TOKEN via cookies!

  public static handleRefreshToken: RequestHandler = async (req, res) => {
    const cookies = req.cookies as ICookies;
    if (!cookies.token) throw new ErrorHandler(401, 'Not Authorized');
    const { id } = await AuthService.jwt.verifyRefreshToken(cookies.token);
    const user = await UserService.getUser(
      { id },
      {
        userName: true,
        email: true,
        newUser: true,
        refresh_token: true,
      }
    );
    if (!user || cookies.token !== user.refresh_token)
      throw new ErrorHandler(401, 'Not Authorized');

    const accessToken = AuthService.jwt.signAccessToken({
      payload: {
        id,
        userName: user.userName,
        email: user.email,
        newUser: user.newUser,
      },
    });
    H.success<IHandleRefreshTokenResponse>(res, {
      statusCode: 200,
      data: { accessToken },
    });
  };

  // For easy access for users who needs to test the app!

  public static easyAccess: IEasyAccessHandler = async (req, res) => {
    const { email } = req.body;
    if (email !== FREE_ACCESS_EMAIL)
      throw new ErrorHandler(403, 'Denied for easy access');
    const user = await UserService.getUser(
      { email },
      {
        userName: true,
        newUser: true,
        id: true,
      }
    );
    if (!user) throw new ErrorHandler(404, 'EASY ACCESS USER not registered!');
    const [accessToken, refreshToken] = [
      AuthService.jwt.signAccessToken({
        payload: {
          userName: user.userName,
          email,
          newUser: user.newUser,
          id: user.id,
        },
      }),
      AuthService.jwt.signRefreshToken({
        payload: {
          userName: user.userName,
          email,
          newUser: user.newUser,
          id: user.id,
        },
      }),
    ];

    await UserService.updateUser(
      {
        id: user.id,
      },
      {
        ...(user.newUser ? { newUser: false } : {}), // Will update this only when the user is "new User" = true
        refresh_token: refreshToken,
      }
    );

    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: AuthService.jwt.COOKIE_EXPIRY,
      secure: true,
      sameSite: 'none',
    });
    H.success<IEasyAccessResponse>(res, {
      statusCode: 200,
      data: { accessToken },
    });
  };

  public static getUser: IGetUserRequestHandler = async (req, res) => {
    const { user_id: userId } = req.session;
    if (!userId) throw new ErrorHandler(400, `User doesn't exists!`);
    const user = await UserService.getUser(
      { id: userId as string },
      {
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        location: true,
        newUser: true,
        profilePic: true,
        coverPic: true,
        about: true,
        created_at: true,
      }
    );
    if (!user) throw new ErrorHandler(400, `User doesn't exists!`);
    H.success<User>(res, {
      statusCode: 200,
      data: user,
    });
  };
}
