import prisma from '@api/integrations/prisma';
import { Prisma, ProductStatus } from '@prisma/client';

export class ProductService {
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
