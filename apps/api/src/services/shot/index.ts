import prisma from '@api/integrations/prisma';
import { Prisma } from '@prisma/client';

export class ShotService {
  public static async fetch(args: Prisma.ShotFindUniqueArgs) {
    return await prisma.shot.findUnique(args);
  }

  public static async fetchMany(args: Prisma.ShotFindManyArgs) {
    return await prisma.shot.findMany(args);
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
