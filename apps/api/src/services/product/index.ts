import prisma from '@api/integrations/prisma';
import { Prisma, ProductStatus } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class ProductService {
  public static async fetch(
    where?: Prisma.ProductWhereUniqueInput,
    include?: Prisma.ProductInclude<DefaultArgs>,
    select?: Prisma.ProductSelect<DefaultArgs>
  ) {
    if (include)
      return await prisma.product.findUnique({
        where,
        include,
      });
    return await prisma.product.findUnique({
      where,
      select,
    });
  }

  public static async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data: { status: ProductStatus.IDLE, ...data },
    });
  }

  public static async update(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.XOR<
      Prisma.ProductUpdateInput,
      Prisma.ProductUncheckedUpdateInput
    >
  ) {
    return await prisma.product.update({
      data,
      where,
    });
  }
}
