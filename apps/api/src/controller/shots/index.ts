import H from '@api/helpers/ResponseHelper';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { IShotsFetchHandler } from './type';
export class ShotController {
  public static fetchTargetProductPosts: IShotsFetchHandler = async (
    req,
    res
  ) => {
    const { productId } = req.query;
    const shotCreationStatus = await Redis.client.cache.get(productId);
    const arePostsSuccessfullyCreated = shotCreationStatus === null;
    if (arePostsSuccessfullyCreated) {
      const product = await ProductService.fetch({ id: productId }, undefined, {
        shots: true,
      });
      return H.success(res, {
        statusCode: 200,
        data: product.shots,
      });
    }
    return H.success(res, {
      statusCode: 200,
      data: { status: shotCreationStatus },
    });
  };
}
