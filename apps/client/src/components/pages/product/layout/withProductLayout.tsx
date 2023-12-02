import { Page } from '@client/components/ui';
import { PRODUCT_TYPES } from '@client/constants/product_types';
import { FC } from 'react';
import { ProductDetailsInstance } from '../context';
import { BuildInPublicProductCard } from './BuildInPublicProductCard';
import { ProductSellProductCard } from './ProductSellProductCard';

export const withProductInformationLayout = (Component: FC) => {
  return () => {
    const { values } = ProductDetailsInstance.useProductDetails();
    return (
      <Page className="flex">
        <div className="flex-1">
          <Component />
        </div>
        <div className="flex-1 bg-emerald-50 flex items-center justify-center">
          {values.productType === PRODUCT_TYPES.BUILD_IN_PUBLIC ? (
            <BuildInPublicProductCard />
          ) : values.productType === PRODUCT_TYPES.PRODUCT_SELL ? (
            <ProductSellProductCard />
          ) : null}
        </div>
      </Page>
    );
  };
};
