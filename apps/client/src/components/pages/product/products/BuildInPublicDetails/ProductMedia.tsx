import { CropperTool } from '@client/components/shared/Tools';
import { IImageMeta } from '@client/components/shared/Tools/CropperTool/types';
import { Button, ImagePanel, TextField } from '@client/components/ui';
import { Modal } from '@client/components/ui/Modal';
import ValidationSchema from '@client/constants/validation_schemas';
import { useToggle } from '@client/hooks';
import { ISingleImageUploadResponse } from '@client/store/types/media';
import { zodResolver } from '@hookform/resolvers/zod';
import { Export } from 'iconsax-react';
import { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';
import { BuildInPublicInformation, IBuildInPublicInitialState } from '.';

type IPhotoType = 'productLogo' | 'productCover';

export const ProductMedia = () => {
  const { controls, handleFormValues, state } =
    BuildInPublicInformation.useMultiStep();

  const [showCropperLogoPhotoTool, { on: onLogo, off: offLogo }] = useToggle();
  const [showCropperCoverPhotoTool, { on, off }] = useToggle();
  const [
    nextStepConfirmationModal,
    { on: showConfirmationModal, off: hideConfirmationModal },
  ] = useToggle();

  const [image, setImage] = useState<IImageMeta>({
    productLogo: {
      base64URL: '',
      file: null,
    },
    productCover: {
      base64URL: '',
      file: null,
    },
  });

  const { formState, setValue, setError, getValues } = useForm<
    Pick<typeof state, IPhotoType>
  >({
    defaultValues: {
      productLogo: state.productLogo,
      productCover: state.productCover,
    },
    resolver: zodResolver(ValidationSchema.productMedia),
  });

  const handleSaveFile = async (eve: React.ChangeEvent<HTMLInputElement>) => {
    if (eve.target.files?.length) {
      const name = eve.target.name as IPhotoType;
      const file = eve.target.files[0];
      try {
        ValidationSchema.productMediaFile.parse(file);
        setError(name, { message: '' });
        const imageURL = URL.createObjectURL(file);
        setImage((prevState) => ({
          ...prevState,
          [eve.target.name]: { file, base64URL: imageURL },
        }));
        handleModalOpener(name);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(name, error.errors[0]);
        }
      }
    }
  };

  const handleModalOpener = useCallback(
    (name: IPhotoType) => {
      switch (name) {
        case 'productCover':
          return on();
        case 'productLogo':
          return onLogo();
        default:
          return;
      }
    },
    [on, onLogo]
  );

  const handleLogoUploadComplete = (data: ISingleImageUploadResponse) => {
    setValue('productLogo', data.croppedImageUrl);
    handleFormValues('productLogo', data.croppedImageUrl);
    if (getValues('productCover')) showConfirmationModal();
  };

  const handleCoverUploadComplete = (data: ISingleImageUploadResponse) => {
    setValue('productCover', data.croppedImageUrl);
    handleFormValues('productCover', data.croppedImageUrl);
    if (getValues('productLogo')) showConfirmationModal();
  };

  const handleRemoveImage = (
    imageType: Extract<
      keyof IBuildInPublicInitialState,
      'productLogo' | 'productCover'
    >
  ) => {
    setValue(imageType, '');
    handleFormValues(imageType, '');
    setImage((prevState) => ({
      ...prevState,
      [imageType]: { file: null, base64URL: '' },
    }));
  };

  console.log(image);

  return (
    <Fragment>
      <div className="h-screen flex items-center justify-center">
        <div className="w-8/12">
          <form className="space-y-10">
            <TextField.File
              id="upload_logo"
              className="w-full h-64 border border-emerald-200 bg-emerald-50/30 rounded-xl block cursor-pointer"
              name="productLogo"
              accept="image/*"
              onChange={handleSaveFile}
              disabled={!!getValues('productLogo')}
            >
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {getValues('productLogo') ? (
                  <ImagePanel
                    variant={'secondary'}
                    src={getValues('productLogo')}
                    alt="product-cover-image"
                    fileName={image.producLogo?.file?.name}
                    onRemoveImage={() => handleRemoveImage('productLogo')}
                  />
                ) : (
                  <Export size="32" color="rgb(16,185,129)" />
                )}
                <h1 className="mt-4 text-slate-500">
                  Upload{' '}
                  <strong className="text-slate-600">
                    {state.productName || 'Product'}'s
                  </strong>{' '}
                  logo
                </h1>
                <p className="mt-2 text-emerald-500">
                  JPG, PNG, WEBP, JPEG are supported formats
                </p>
                <p className="mt-3 text-slate-900 text-base font-semibold">
                  Try to keep the size below 2mb.
                </p>
                {formState.errors.productLogo?.message ? (
                  <p className="absolute bottom-3 px-3 py-1.5 text-xs font-bold rounded-md bg-rose-100 text-rose-500">
                    {formState.errors.productLogo?.message}
                  </p>
                ) : null}
              </div>
            </TextField.File>

            <TextField.File
              id="upload_cover"
              className="w-full h-64 rounded-xl border block cursor-pointer"
              name="productCover"
              accept="image/*"
              onChange={handleSaveFile}
              disabled={!!getValues('productCover')}
            >
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                {getValues('productCover') ? (
                  <ImagePanel
                    variant={'primary'}
                    src={getValues('productCover')}
                    alt="product-cover-image"
                    fileName={image.productCover?.file?.name}
                    onRemoveImage={() => handleRemoveImage('productCover')}
                  />
                ) : (
                  <Export size="32" color="rgb(16,185,129)" />
                )}
                <h1 className="mt-4 text-slate-500">
                  Upload{' '}
                  <strong className="text-slate-600">
                    {state.productName || 'Product'}'s
                  </strong>{' '}
                  cover photo
                </h1>
                <p className="mt-2 text-slate-300">
                  JPG, PNG, WEBP, JPEG are supported formats
                </p>
                <p className="mt-3 text-slate-900 text-base font-semibold">
                  Try to keep the size below 2mb.
                </p>
                {formState.errors.productCover?.message ? (
                  <p className="absolute bottom-3 px-3 py-1.5 text-xs font-bold rounded-md bg-rose-100 text-rose-500">
                    {formState.errors.productCover?.message}
                  </p>
                ) : null}
              </div>
            </TextField.File>
          </form>
        </div>
      </div>
      <CropperTool
        name="productCover"
        show={showCropperCoverPhotoTool}
        onHide={off}
        imageMetaData={image.productCover}
        title="Crop and Save your Cover Photo"
        imageSuggestions="Upload a 1600 x 480px image for better results"
        onUploadComplete={handleCoverUploadComplete}
      />
      <CropperTool
        name="productLogo"
        show={showCropperLogoPhotoTool}
        onHide={offLogo}
        imageMetaData={image.productLogo}
        title="Crop and Save your Logo"
        imageSuggestions="Upload a 800 x 800px image for better results"
        aspectRatio="square"
        cropShape="round"
        showGrid={false}
        onUploadComplete={handleLogoUploadComplete}
        objectFit="cover"
      />
      <Modal show={true} onHide={hideConfirmationModal}>
        <div className="bg-white w-[390px] flex flex-col justify-between shadow-md shadow-slate-600/5 rounded-xl p-5">
          <div className="relative">
            <h1 className="text-base leading-6 font-[700] text-slate-900 flex-[0.9]">
              Would you like to continue or make any edits to the product media
              before finalizing?
            </h1>

            <p className="mt-2 leading-6">
              We have successfully generated your post. To see your generate
              posts please click on{' '}
              <strong className="text-slate-900">"Continue"</strong>
            </p>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant={'danger.outline'} size={'md'}>
              No, just proceed!
            </Button>
            <Button
              variant={'neutral.solid'}
              size={'md'}
              onClick={controls.next}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
