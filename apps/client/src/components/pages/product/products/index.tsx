import { PRODUCT_TYPES } from '@client/constants/product_types';
import { ProductDetailsInstance } from '../context';
import { ProductTracker } from '../context/ProductTracker';
import { BuildInPublicInformation } from './BuildInPublicDetails';

export const ProductInformationCollector = () => {
  const { values } = ProductDetailsInstance.useProductDetails();
  return (
    <ProductTracker
      productType={values.productType as keyof typeof PRODUCT_TYPES}
    >
      {values.productType === PRODUCT_TYPES.BUILD_IN_PUBLIC ? (
        <BuildInPublicInformation />
      ) : //   :
      //   values.productType === PRODUCT_TYPES.PRODUCT_SELL ? (
      //   <ProductSellInformation />
      // )
      null}
    </ProductTracker>
  );
};
