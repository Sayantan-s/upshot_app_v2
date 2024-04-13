import { Page, RadioGroup } from '@client/components/ui';
import { PRODUCT_TYPES } from '@client/constants/product_types';
import { FC } from 'react';
import { ProductDetailsInstance } from '../context';

export const ProductTypeInformationCollector: FC = () => {
  const { values, handleCreateInstance } =
    ProductDetailsInstance.useProductDetails();

  return !values.instance || !values.productType ? (
    <Page className="flex items-center justify-center bg-slate-100">
      <div>
        <h1 className="text-slate-900 text-2xl font-medium">
          What product you want to add to your shop ?
        </h1>
        <RadioGroup
          className="mt-4"
          defaultValue={values.productType}
          onSelect={handleCreateInstance}
        >
          <RadioGroup.Option value={PRODUCT_TYPES.BUILD_IN_PUBLIC}>
            Build in public
          </RadioGroup.Option>
        </RadioGroup>
      </div>
    </Page>
  ) : null;
};
