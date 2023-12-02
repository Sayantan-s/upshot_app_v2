import {
  ProductDetailsInstance,
  ProductInformationCollector,
  ProductTypeInformationCollector,
} from '@client/components/pages/product';

export const ProductUpload = () => (
  <ProductDetailsInstance persist>
    <ProductTypeInformationCollector />
    <ProductInformationCollector />
  </ProductDetailsInstance>
);
