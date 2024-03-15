import { ProductController } from '@api/controller/product';
import ErrorHandler from '@api/middlewares/error';
import express from 'express';

const productRouter = express.Router();

productRouter
  .route('/create')
  .post(ErrorHandler.tryCatch(ProductController.createProduct));

productRouter
  .route('/update/:productId')
  .post(ErrorHandler.tryCatch(ProductController.updateProduct));

export default productRouter;
