import { User } from "@prisma/client";

export type IUser = Pick<User, "email" | "userName">;

export interface IUserRegister extends IUser {
  pwd: string;
}

export type IUserParams =
  | {
      id: string;
    }
  | {
      userName: string;
    }
  | {
      email: string;
    }
  | {
      refresh_token: string;
    };
