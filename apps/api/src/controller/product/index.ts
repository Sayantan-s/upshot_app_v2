import H from '@api/helpers/ResponseHelper';
import { ProductService } from '@api/services/product';
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
    await ProductService.update({ id: productId }, data);
    H.success(res, {
      statusCode: 204,
      data: null,
    });
  };
}
