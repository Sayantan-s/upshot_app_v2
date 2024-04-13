import prisma from '@api/integrations/prisma';
import { Prisma, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { IUser } from './types';

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

  public static async createUser(payload: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: payload,
    });
  }

  public static async fetch(
    where?: Prisma.UserWhereUniqueInput,
    include?: Prisma.UserInclude<DefaultArgs>,
    select?: Prisma.UserSelect<DefaultArgs>
  ) {
    try {
      if (include)
        return await prisma.user.findUnique({
          where,
          include,
        });
      return await prisma.user.findUnique({
        where,
        select,
      });
    } catch (error) {
      console.log(error);
    }
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
