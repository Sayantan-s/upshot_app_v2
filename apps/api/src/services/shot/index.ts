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

  public static async createMany(data: Prisma.ShotCreateManyInput[]) {
    return await prisma.shot.createMany({ data });
  }
}
