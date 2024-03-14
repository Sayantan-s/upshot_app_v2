import { Button, TextField } from '@client/components/ui';
import { Modal } from '@client/components/ui/Modal';
import { ProductOnboardingStatus } from '@client/constants/Product';
import ValidationSchema from '@client/constants/validation_schemas';
import { useToggle } from '@client/hooks';
import { productApi } from '@client/store/services/product';
import { IGenerationRequest } from '@client/store/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Switch from '@radix-ui/react-switch';
import {
  Activity,
  ArrowRight,
  Bubble,
  TextalignJustifycenter,
} from 'iconsax-react';
import { ChangeEventHandler, Fragment, SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { BuildInPublicInformation } from '.';
import { ProductTracker } from '../../context/ProductTracker';

export const ProductIdenity = () => {
  const { controls, handleFormValues, state } =
    BuildInPublicInformation.useMultiStep();
  const [isOpen, { on: openConfirmationModal, off: closeConfirmationModal }] =
    useToggle();
  const navigate = useNavigate();
  const [generate, { isLoading }] = productApi.useGenerateMutation();
  const [createProduct, { isLoading: isCreatingProduct }] =
    productApi.useCreateMutation();
  const { handleSetProduct } = ProductTracker.useProductTracker();

  const [generationConfig, setGenerationConfig] = useState({
    generateProductDescription: true,
    setupInitialFiveAutomatedPosts: false,
  });

  const handleCheckGenerationConfig = (
    key: keyof typeof generationConfig,
    value: boolean
  ) => setGenerationConfig((prevState) => ({ ...prevState, [key]: value }));

  const {
    handleSubmit,
    register: formStateHandler,
    formState,
    watch,
  } = useForm<IGenerationRequest>({
    defaultValues: {
      productMoto: state.productName,
      productName: state.productMoto,
    },
    resolver: zodResolver(ValidationSchema.productIdenity),
  });

  const handleAskForGeneration = (
    values: IGenerationRequest | SyntheticEvent
  ) => {
    if ('productName' in values && 'productMoto' in values)
      openConfirmationModal();
  };

  const handleGenerate = async () => {
    const payload = {
      ...watch(),
      ...generationConfig,
    };
    const res = await generate(payload).unwrap();
    handleFormValues('productName', payload.productName);
    handleFormValues('productMoto', payload.productMoto);
    handleFormValues('productDescription', res.data.description);
    handleSetProduct('productDescription', res.data.description);
    closeConfirmationModal();
    controls.next();
  };

  const handleProceedNext = async () => {
    const payload = watch();
    handleFormValues('productName', payload.productName);
    handleFormValues('productMoto', payload.productMoto);

    const { data: productId } = await createProduct({
      productMoto: payload.productMoto,
      productName: payload.productName,
    }).unwrap();

    navigate({
      pathname: '/product/upload',
      search: createSearchParams({
        product: productId,
        status: ProductOnboardingStatus.CREATE,
      }).toString(),
    });

    closeConfirmationModal();
    controls.next();
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (eve) => {
    const { name, value } = eve.target;
    const inputName = name as keyof Pick<
      IGenerationRequest,
      'productMoto' | 'productName'
    >;
    formStateHandler(inputName).onChange({
      target: eve.target,
      type: eve.target.type,
    });
    handleSetProduct(inputName, value);
  };

  return (
    <Fragment>
      <div className="h-screen flex items-center justify-center">
        <div className="w-8/12">
          <h1 className="mb-10 text-slate-400/70 text-3xl font-semibold leading-[2.6rem]">
            Onboarding your{' '}
            <span className="text-3xl font-bold text-slate-900">MVP</span> ?{' '}
            <br />
            Don't forget your{' '}
            <span className="text-3xl font-bold text-slate-900">
              "Product Motto"
            </span>
            .
          </h1>
          <form onSubmit={handleSubmit(handleAskForGeneration)}>
            <div className="space-y-4">
              <TextField
                placeholder="Enter your product name eg: Zapie..."
                className="w-full"
                type="text"
                {...formStateHandler('productName')}
                onChange={handleChange}
                error={formState.errors.productName}
              />
              <TextField.TextArea
                placeholder="Enter your product moto eg: Build & leave to u..."
                rows={3}
                {...formStateHandler('productMoto')}
                onChange={handleChange}
                error={formState.errors.productMoto}
              />
            </div>
            <Button
              variant={'neutral.solid'}
              size={'xl'}
              rounded={'lg'}
              fullWidth
              className="mt-10"
              icon={<ArrowRight color="white" size={20} />}
              iconPlacement="right"
            >
              Next
            </Button>
          </form>
        </div>
      </div>
      <Modal show={isOpen} onHide={closeConfirmationModal} freeze={isLoading}>
        <div className="bg-white w-[390px] flex flex-col justify-between shadow-md shadow-slate-600/5 rounded-xl p-5">
          <div className="relative">
            <h1 className="text-base leading-6 font-[700] text-slate-900 flex-[0.9]">
              Are you sure you want your product media and content
              auto-generated?
            </h1>

            <p className="mt-2 leading-6">
              The auto-generated media content will be editable and can be
              customized as you proceed with your product onboarding.
            </p>
          </div>
          <div className="space-y-3 mt-4">
            <label className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-3">
                <TextalignJustifycenter
                  size="20"
                  color="rgb(148,163,184)"
                  variant="Bold"
                />
                <span className="text-sm font-semibold text-slate-900">
                  Generate Product Description
                </span>
              </div>
              <Switch.Root
                checked={generationConfig.generateProductDescription}
                onCheckedChange={(value) =>
                  handleCheckGenerationConfig(
                    'generateProductDescription',
                    value
                  )
                }
                className={`w-[42px] h-[26px] ${
                  generationConfig.generateProductDescription
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                } rounded-full relative`}
              >
                <Switch.Thumb
                  className={`w-[21px] h-[21px] shadow-md transition-transform duration-150 transform ${
                    generationConfig.generateProductDescription
                      ? 'translate-x-[18px]'
                      : 'translate-x-[3px]'
                  } rounded-full bg-white block`}
                />
              </Switch.Root>
            </label>
            <label className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-3">
                <Activity size="20" color="rgb(148,163,184)" variant="Linear" />
                <span className="text-sm font-semibold text-slate-900">
                  Setup Initial 5 Posts
                </span>
              </div>
              <Switch.Root
                checked={generationConfig.setupInitialFiveAutomatedPosts}
                onCheckedChange={(value) =>
                  handleCheckGenerationConfig(
                    'setupInitialFiveAutomatedPosts',
                    value
                  )
                }
                className={`w-[42px] h-[26px] ${
                  generationConfig.setupInitialFiveAutomatedPosts
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                } rounded-full relative`}
              >
                <Switch.Thumb
                  className={`w-[21px] h-[21px] shadow-md transition-transform duration-150 transform ${
                    generationConfig.setupInitialFiveAutomatedPosts
                      ? 'translate-x-[18px]'
                      : 'translate-x-[3px]'
                  } rounded-full bg-white block`}
                />
              </Switch.Root>
            </label>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              onClick={handleProceedNext}
              variant={'danger.outline'}
              disabled={isLoading}
              isLoading={isCreatingProduct}
              size={'md'}
              loaderVersion="v1"
            >
              No, just proceed!
            </Button>
            <Button
              variant={'neutral.solid'}
              onClick={handleGenerate}
              disabled={
                (!generationConfig.generateProductDescription &&
                  !generationConfig.setupInitialFiveAutomatedPosts) ||
                isCreatingProduct
              }
              isLoading={isLoading}
              rounded={'md'}
              size={'md'}
              icon={<Bubble variant="Bulk" size={14} color="white" />}
              iconPlacement="left"
              loaderVersion="v1"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
