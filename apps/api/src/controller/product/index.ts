import H from '@api/helpers/ResponseHelper';
import { ProductService } from '@api/services/product';
import { IProductCreateHandler } from './type';

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
}
