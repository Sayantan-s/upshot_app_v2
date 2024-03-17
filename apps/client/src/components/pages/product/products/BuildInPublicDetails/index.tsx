/* eslint-disable react/jsx-no-useless-fragment */
import { Loader } from '@client/components/ui';
import { createMultiStep } from '@client/components/ui/MultiStep';
import { ProductOnboardingStatus } from '@client/constants/Product';
import {
  IBuildInPublicInitialState,
  useOnboardingProductState,
} from '@client/hooks';
import { productApi } from '@client/store/services/product';
import { ArrowRight } from 'iconsax-react';
import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
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

const handleSubmit = () => {};

const Component: FC = () => {
  const {
    state,
    productId,
    mode,
    isPreviouslySavedDataPopulated,
    apiStatus: { isFetching },
  } = useOnboardingProductState();

  const { state: bipState, handleSetProduct } =
    ProductTracker.useProductTracker();
  const productState = bipState as IBuildInPublicInitialState;
  const navigate = useNavigate();

  const [finaliseProduct, { isLoading }] = productApi.useFinaliseMutation();
  const handleFinalise = async () => {
    await finaliseProduct({ id: state.productId });
    navigate(`/product/postmanualedits/${state.productId}`);
  };

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

  useEffect(() => {
    if (isPreviouslySavedDataPopulated) {
      handleSetProduct('productId', state.productId);
      handleSetProduct('productName', state.productName);
      handleSetProduct('productMoto', state.productMoto);
      handleSetProduct('productDescription', state.productDescription);
      handleSetProduct('productCover', state.productCoverName);
      handleSetProduct('productLogo', state.productLogo);
      handleSetProduct('productPrice', '' + state.productPrice);
      handleSetProduct('productCurrency', state.productCurrency);
      handleSetProduct('tags', '');
    }
  }, [isPreviouslySavedDataPopulated, isFetching, inOnboardingMode, state]);

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
        <button
          className="absolute right-10 bottom-10 z-50 bg-white flex items-center justify-between p-3 shadow-md shadow-gray-500/10 space-x-2 h-12 w-56"
          disabled={isLoading}
          onClick={handleFinalise}
        >
          <span>Continue to dashboard</span>
          <span className="bg-gray-900 w-8 aspect-square flex items-center justify-center rounded-full">
            {isLoading ? (
              <Loader version="v2" size={'sm'} />
            ) : (
              <ArrowRight size={16} color="white" />
            )}
          </span>
        </button>
      ) : null}
    </>
  );
};

const FinalComponent = withProductInformationLayout(Component);

export const BuildInPublicInformation = Object.assign(FinalComponent, {
  useMultiStep,
});
