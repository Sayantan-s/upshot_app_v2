import { ProductController } from '@api/controller/product';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import {
  finaliseProdParamSchema,
  createProdSchema,
  updateProdParamSchema,
  fetchProdSchema,
} from '@api/validation/product/product';
import express from 'express';

const productRouter = express.Router();

productRouter.post(
  '/',
  validate(createProdSchema),
  ErrorHandler.tryCatch(ProductController.createProduct)
);

productRouter
  .get(
    '/:productId',
    validate(fetchProdSchema),
    ErrorHandler.tryCatch(ProductController.fetchProduct)
  )
  .patch(
    '/:productId', //validate(RequestBody)
    validate(updateProdParamSchema),
    ErrorHandler.tryCatch(ProductController.updateProduct)
  );

productRouter.patch(
  '/:productId/finalise',
  validate(finaliseProdParamSchema),
  ErrorHandler.tryCatch(ProductController.finaliseProduct)
);

export default productRouter;
