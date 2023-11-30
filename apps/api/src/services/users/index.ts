import prisma from '@api/integrations/prisma';
import { Prisma, User } from '@prisma/client';
import { IUser, IUserParams, IUserRegister } from './types';

export class UserService {
  // CHECK USER IF EXISTS
  public static async userExists(payload: Partial<IUser>) {
    let doesExists: User | null = null;
    if ('userName' in payload && 'email' in payload) {
      // If both property is provided: i.e. registration
      doesExists = await prisma.user.findFirst({
        where: {
          OR: [{ userName: payload.userName }, { email: payload.email }],
        },
      });
    } else if (
      'userName' in payload && // If userName property is provided: i.e. login
      !payload.email
    ) {
      doesExists = await prisma.user.findFirst({
        where: {
          userName: payload.userName,
        },
      });
    } else if (
      'email' in payload && // If email property is provided: i.e. login
      !payload.userName
    ) {
      doesExists = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
      });
    } else return false; // If no property return false!
    return !!doesExists;
  }

  public static async createUser(payload: IUserRegister) {
    return await prisma.user.create({
      data: payload,
    });
  }

  public static async getUser(
    payload: Partial<IUserParams>,
    select?: Prisma.UserSelect
  ) {
    let user: User | null = null;
    if ('userName' in payload) {
      user = await prisma.user.findFirst({
        where: {
          userName: payload.userName,
        },
      });
    } else if ('email' in payload) {
      user = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
        ...(select ? { select } : {}),
      });
    } else if ('id' in payload) {
      user = await prisma.user.findFirst({
        where: {
          id: payload.id,
        },
        ...(select ? { select } : {}),
      });
    } else return null; // If no property return false!
    return user;
  }

  public static async updateUser(
    payload: Prisma.UserWhereUniqueInput,
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>
  ) {
    return await prisma.user.update({
      data: update,
      where: { ...payload },
    });
  }
}
