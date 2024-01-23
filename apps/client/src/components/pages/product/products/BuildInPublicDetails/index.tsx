import { createMultiStep } from '@client/components/ui/MultiStep';
import { PRDOUCT_TYPE_TAGS } from '@client/constants/tags/producttype';
import { FC } from 'react';
import { withProductInformationLayout } from '../../layout';
import { ProductDescription } from './ProductDescription';
import { ProductIdenity } from './ProductIdenity';
import { ProductMedia } from './ProductMedia';

export enum BUILD_IN_PUBLIC_MULTISTEP {
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
  STEP_4 = 'STEP_4',
}

export interface IBuildInPublicInitialState {
  productName: string;
  productMoto: string;
  productDescription: string;
  productLogo: string;
  productCover: string;
  tags: typeof PRDOUCT_TYPE_TAGS;
}

export const buildInPublicInitialState: IBuildInPublicInitialState = {
  productName: '',
  productMoto: '',
  productDescription: '',
  productLogo: '',
  productCover: '',
  tags: [],
};

const [MultiStep, useMultiStep] = createMultiStep<
  typeof buildInPublicInitialState,
  keyof typeof BUILD_IN_PUBLIC_MULTISTEP
>({
  contextName: 'build-in-public-product',
});

const Component: FC = () => {
  const handleSubmit = () => {};

  const handleCacheCurrentChanges = () => {};

  return (
    <MultiStep
      defaultStep={BUILD_IN_PUBLIC_MULTISTEP.STEP_1}
      state={buildInPublicInitialState}
      onSubmit={handleSubmit}
      onStepChange={handleCacheCurrentChanges}
    >
      <MultiStep.Step value={BUILD_IN_PUBLIC_MULTISTEP.STEP_1}>
        <ProductIdenity />
      </MultiStep.Step>
      <MultiStep.Step value={BUILD_IN_PUBLIC_MULTISTEP.STEP_2}>
        <ProductDescription />
      </MultiStep.Step>
      <MultiStep.Step value={BUILD_IN_PUBLIC_MULTISTEP.STEP_3}>
        <ProductMedia />
      </MultiStep.Step>
      <MultiStep.Step value={BUILD_IN_PUBLIC_MULTISTEP.STEP_4}></MultiStep.Step>
    </MultiStep>
  );
};

const FinalComponent = withProductInformationLayout(Component);

export const BuildInPublicInformation = Object.assign(FinalComponent, {
  useMultiStep,
});
