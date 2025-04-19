import { ProductController } from '@api/controller/product';
import { AuthMiddleware } from '@api/middlewares/auth';
import ErrorHandler from '@api/middlewares/error';
import { validate } from '@api/middlewares/zod';
import { createProdSchema } from '@api/validation/product/product';
import express from 'express';

const productRouter = express.Router();

productRouter.use(AuthMiddleware.withAuthorization);

productRouter.post('/onboard', ProductController.onboardProduct);

productRouter.post(
  '/',
  validate(createProdSchema),
  ErrorHandler.tryCatch(ProductController.createProduct)
);

productRouter
  .get(
    '/:productId',
    // validate(fetchProdSchema),
    ErrorHandler.tryCatch(ProductController.fetchProduct)
  )
  .patch(
    '/:productId', //validate(RequestBody)
    // validate(updateProdParamSchema),
    ErrorHandler.tryCatch(ProductController.updateProduct)
  );

productRouter.patch(
  '/:productId/finalise',
  // validate(finaliseProdParamSchema),
  ErrorHandler.tryCatch(ProductController.finaliseProduct)
);

export default productRouter;
