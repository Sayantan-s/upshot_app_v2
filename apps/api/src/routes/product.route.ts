import { ProductController } from '@api/controller/product';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const productRouter = express.Router();

productRouter
  .route('/')
  .post(ErrorHandler.tryCatch(ProductController.createProduct));

productRouter
  .route('/:productId')
  .get(ErrorHandler.tryCatch(ProductController.fetchProduct))
  .patch(ErrorHandler.tryCatch(ProductController.updateProduct));

productRouter
  .route('/:productId/finalise')
  .patch(ErrorHandler.tryCatch(ProductController.finaliseProduct));

productRouter.route('');

export default productRouter;
