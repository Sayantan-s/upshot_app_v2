import H from '@api/helpers/ResponseHelper';
import { ProductService } from '@api/services/product';
import { IProductCreateHandler, IProductUpdateHandler } from './type';

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
    H.success(res, {
      statusCode: 201,
      data: product.id,
    });
  };

  public static updateProduct: IProductUpdateHandler = async (req, res) => {
    const data = req.body;
    const { productId } = req.params;
    await ProductService.update({ id: productId }, data);
    H.success(res, {
      statusCode: 200,
      data: null,
    });
  };
}
