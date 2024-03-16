import { Loader } from '@client/components/ui';
import { createMultiStep } from '@client/components/ui/MultiStep';
import { ProductOnboardingStatus } from '@client/constants/Product';
import { PRDOUCT_TYPE_TAGS } from '@client/constants/tags/producttype';
import { useOnboardingProductState } from '@client/hooks';
import { FC, useMemo } from 'react';
import { withProductInformationLayout } from '../../layout';
import { ProductDescription } from './ProductDescription';
import { ProductIdenity } from './ProductIdenity';
import { ProductMedia } from './ProductMedia';

export enum BUILD_IN_PUBLIC_MULTISTEP {
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
}

export interface IBuildInPublicInitialState {
  productId: string;
  productName: string;
  productMoto: string;
  productDescription: string;
  productLogo: string;
  productCover: string;
  tags: typeof PRDOUCT_TYPE_TAGS;
}

export const buildInPublicInitialState: IBuildInPublicInitialState = {
  productId: '',
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

  const {
    state,
    productId,
    mode,
    isPreviouslySavedDataPopulated,
    apiStatus: { isFetching },
  } = useOnboardingProductState();

  const inOnboardingMode = useMemo(
    () =>
      (productId && mode === ProductOnboardingStatus.CREATE) ||
      (productId && mode === ProductOnboardingStatus.EDIT),
    [productId, mode]
  );

  const defaultStep = useMemo(
    () =>
      inOnboardingMode
        ? BUILD_IN_PUBLIC_MULTISTEP.STEP_2
        : BUILD_IN_PUBLIC_MULTISTEP.STEP_1,
    [inOnboardingMode]
  );

  const defaultStepCount = Number(inOnboardingMode);

  return isFetching || (inOnboardingMode && !isPreviouslySavedDataPopulated) ? (
    <Loader size={'lg'} version="v2" variant={'primary.flat'} />
  ) : (
    <MultiStep
      defaultStep={defaultStep}
      state={state}
      onSubmit={handleSubmit}
      defaultStepCount={defaultStepCount}
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
    </MultiStep>
  );
};

const FinalComponent = withProductInformationLayout(Component);

export const BuildInPublicInformation = Object.assign(FinalComponent, {
  useMultiStep,
});
