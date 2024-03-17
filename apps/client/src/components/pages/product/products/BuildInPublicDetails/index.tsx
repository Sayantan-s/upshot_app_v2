/* eslint-disable react/jsx-no-useless-fragment */
import { Loader } from '@client/components/ui';
import { createMultiStep } from '@client/components/ui/MultiStep';
import { ProductOnboardingStatus } from '@client/constants/Product';
import {
  IBuildInPublicInitialState,
  useOnboardingProductState,
} from '@client/hooks';
import { FC, useMemo } from 'react';
import { ProductTracker } from '../../context/ProductTracker';
import { withProductInformationLayout } from '../../layout';
import { ProductDescription } from './ProductDescription';
import { ProductIdenity } from './ProductIdenity';
import { ProductMedia } from './ProductMedia';

export enum BUILD_IN_PUBLIC_MULTISTEP {
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
}

const [MultiStep, useMultiStep] = createMultiStep<
  IBuildInPublicInitialState,
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

  const { state: bipState } = ProductTracker.useProductTracker();
  const productState = bipState as IBuildInPublicInitialState;

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
    <>
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
      {productState.productLogo ? (
        <button className="absolute right-0 bottom-0 z-50 bg-red-200">
          Continue to dashboard
        </button>
      ) : null}
    </>
  );
};

const FinalComponent = withProductInformationLayout(Component);

export const BuildInPublicInformation = Object.assign(FinalComponent, {
  useMultiStep,
});
