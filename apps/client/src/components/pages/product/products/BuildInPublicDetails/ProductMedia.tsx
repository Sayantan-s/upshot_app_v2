import { CropperTool } from '@client/components/shared/Tools';
import { IImageMetaData } from '@client/components/shared/Tools/CropperTool/types';
import { ImagePanel, TextField } from '@client/components/ui';
import ValidationSchema from '@client/constants/validation_schemas';
import { useToggle } from '@client/hooks';
import { ISingleImageUploadResponse } from '@client/store/types/media';
import { zodResolver } from '@hookform/resolvers/zod';
import { Export } from 'iconsax-react';
import { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';
import { BuildInPublicInformation } from '.';

type IPhotoType = 'productLogo' | 'productCover';

export const ProductMedia = () => {
  const { handleFormValues, state } = BuildInPublicInformation.useMultiStep();

  const [showCropperLogoPhotoTool, { on: onLogo, off: offLogo }] = useToggle();
  const [showCropperCoverPhotoTool, { on, off }] = useToggle();
  const [image, setImage] = useState<IImageMetaData>({
    base64URL: '',
    file: null,
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
        setImage({ file, base64URL: imageURL });
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

  const handleLogoUploadComplete = async (data: ISingleImageUploadResponse) => {
    setValue('productLogo', data.croppedImageUrl);
    handleFormValues('productLogo', data.croppedImageUrl);
  };

  const handleCoverUploadComplete = async (
    data: ISingleImageUploadResponse
  ) => {
    setValue('productCover', data.croppedImageUrl);
    handleFormValues('productCover', data.croppedImageUrl);
  };

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
                    fileName={image.file!.name!}
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
                    fileName={image.file!.name!}
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
        intent={`PRODUCT_${state.productId}`}
        name="productCover"
        show={showCropperCoverPhotoTool}
        onHide={off}
        imageMetaData={image}
        title="Crop and Save your Cover Photo"
        imageSuggestions="Upload a 1600 x 480px image for better results"
        onUploadComplete={handleCoverUploadComplete}
      />
      <CropperTool
        intent={`PRODUCT_${state.productId}`}
        name="productLogo"
        show={showCropperLogoPhotoTool}
        onHide={offLogo}
        imageMetaData={image}
        title="Crop and Save your Logo"
        imageSuggestions="Upload a 800 x 800px image for better results"
        aspectRatio="square"
        cropShape="round"
        showGrid={false}
        onUploadComplete={handleLogoUploadComplete}
        objectFit="cover"
      />
    </Fragment>
  );
};
