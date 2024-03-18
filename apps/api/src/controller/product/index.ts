import H from '@api/helpers/ResponseHelper';
import { Redis } from '@api/integrations/redis';
import { ProductService } from '@api/services/product';
import { ProductStatus } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import {
  IProductCreateHandler,
  IProductFetchHandler,
  IProductUpdateHandler,
} from './type';
export class ProductController {
  public static createProduct: IProductCreateHandler = async (req, res) => {
    const { productMoto, productName } = req.body;
    const userId = req.session.user_id;
    const product = await ProductService.create({
      productName,
      productMoto,
      user: {
        connect: {
          id: userId,
        },
      },
    });
    res.cookie('onboarding-session', uuid());
    H.success(res, {
      statusCode: 201,
      data: product.id,
    });
  };

  public static fetchProduct: IProductFetchHandler = async (req, res) => {
    const { productId } = req.params;
    const productData = await ProductService.fetch({ id: productId });
    H.success(res, {
      statusCode: 200,
      data: productData,
    });
  };

  public static updateProduct: IProductUpdateHandler = async (req, res) => {
    const data = req.body;
    const { productId } = req.params;
    const currentStringifiedData = JSON.stringify(data);
    const cacheCurrentData = await Redis.client.cache.get(productId);
    if (cacheCurrentData !== currentStringifiedData) {
      await ProductService.update({ id: productId }, data);
      await Redis.client.cache.setex(productId, 1000, JSON.stringify(data));
    }
    H.success(res, {
      statusCode: 204,
      data: null,
    });
  };

  public static finaliseProduct: IProductUpdateHandler = async (req, res) => {
    const { productId } = req.params;
    const key = `PRODUCT_FINALISE_${productId}`;
    const isProductFinalized = await Redis.client.cache.get(key);
    if (!isProductFinalized) {
      await ProductService.update(
        { id: productId },
        {
          status: ProductStatus.COMING_SOON,
        }
      );
      await Redis.client.cache.setex(key, 3 * 1000, 1);
    }
    H.success(res, {
      statusCode: 204,
      data: null,
    });
  };
}
