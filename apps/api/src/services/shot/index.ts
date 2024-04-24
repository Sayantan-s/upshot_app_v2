import prisma from '@api/integrations/prisma';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class ShotService {
  public static async fetch(
    where?: Prisma.ShotWhereUniqueInput,
    include?: Prisma.ShotInclude<DefaultArgs>,
    select?: Prisma.ShotSelect<DefaultArgs>
  ) {
    if (include)
      return await prisma.shot.findUnique({
        where,
        include,
      });
    return await prisma.shot.findUnique({
      where,
      select,
    });
  }

  public static async fetchMany(
    where?: Prisma.ShotWhereUniqueInput,
    include?: Prisma.ShotInclude<DefaultArgs>,
    select?: Prisma.ShotSelect<DefaultArgs>
  ) {
    if (include)
      return await prisma.shot.findMany({
        where,
        include,
      });
    return await prisma.shot.findMany({
      where,
      select,
    });
  }

  public static async create(data: Prisma.ShotCreateArgs) {
    return await prisma.shot.create({ ...data });
  }
  public static async createMany(data: Prisma.ShotCreateManyInput[]) {
    return await prisma.shot.createMany({ data });
  }

  public static async delete(args: Prisma.ShotDeleteArgs) {
    return await prisma.shot.delete(args);
  }

  public static async update(
    where: Prisma.ShotWhereUniqueInput,
    data: Prisma.XOR<Prisma.ShotUpdateInput, Prisma.ShotUncheckedUpdateInput>
  ) {
    return await prisma.shot.update({
      data,
      where,
    });
  }

  public static async updateMany(
    where: Prisma.ShotWhereInput,
    data: Prisma.XOR<Prisma.ShotUpdateInput, Prisma.ShotUncheckedUpdateInput>
  ) {
    return await prisma.shot.updateMany({
      data,
      where,
    });
  }
}
