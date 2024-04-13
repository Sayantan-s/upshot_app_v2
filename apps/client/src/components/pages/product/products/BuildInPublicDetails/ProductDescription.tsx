import { Button, ListBoxInit, TextField } from '@client/components/ui';
import { PRDOUCT_TYPE_TAGS } from '@client/constants/tags/producttype';
import ValidationSchema from '@client/constants/validation_schemas';
import { productApi } from '@client/store/services/product';
import { IProduct, ProductPriceCurrency } from '@client/store/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, ArrowRight } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { BuildInPublicInformation } from '.';

const SelectionList = ListBoxInit<(typeof PRDOUCT_TYPE_TAGS)[number]>();

export const ProductDescription = () => {
  const { controls, handleFormValues, state } =
    BuildInPublicInformation.useMultiStep();

  const [updateProduct, { isLoading }] = productApi.useUpdateMutation();

  const {
    handleSubmit,
    register: formStateHandler,
    formState,
    watch,
    setValue,
    getValues,
  } = useForm<
    Pick<
      typeof state,
      'productDescription' | 'tags' | 'productPrice' | 'productCurrency'
    >
  >({
    values: {
      productDescription: state.productDescription,
      tags: state.tags,
      productCurrency: state.productCurrency,
      productPrice: state.productPrice,
    },
    resolver: zodResolver(ValidationSchema.productDescription),
  });

  const handleTagChange = (selectedTags: typeof PRDOUCT_TYPE_TAGS) => {
    setValue('tags', selectedTags);
    handleFormValues('tags', selectedTags);
  };

  const handleUpdateProductDescription = async (
    values: Pick<
      typeof state,
      'productDescription' | 'productCurrency' | 'productPrice'
    >
  ) => {
    handleFormValues('productDescription', values.productDescription);
    handleFormValues('productPrice', values.productPrice);
    handleFormValues('productCurrency', values.productCurrency);
    const tags = watch().tags.map((tag) => tag.value) as IProduct['tags'];
    await updateProduct({
      id: state.productId,
      productDescription: values.productDescription,
      tags,
      price: {
        amount: values.productPrice,
        currency: values.productCurrency,
      },
    }).unwrap();
    controls.next();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8/12">
        <h1 className="mb-10 text-slate-400/70 text-3xl font-semibold leading-[2.6rem]">
          Attach correct Product Tags and
          <br />{' '}
          <span className="text-3xl font-bold text-slate-900">
            Describe your Product
          </span>
          .
        </h1>
        <form onSubmit={handleSubmit(handleUpdateProductDescription)}>
          <div className="space-y-8">
            <SelectionList
              options={PRDOUCT_TYPE_TAGS}
              value={getValues().tags}
              onChange={handleTagChange}
              renderTag={(tag, handleDelete) => (
                <div
                  key={tag.value}
                  aria-roledescription="tag"
                  className="bg-slate-50 hover:bg-slate-100 space-x-0.5 h-full p-3 flex items-center justify-center rounded-full min-w-[7rem]"
                >
                  <Add
                    size={20}
                    color="rgb(30,41,59)"
                    className="rotate-45 cursor-pointer"
                    onClick={() => handleDelete(tag.value)}
                  />
                  <span className="text-slate-800">{tag.displayValue}</span>
                </div>
              )}
              input={
                <TextField
                  placeholder="Choose your product tags!"
                  error={formState.errors.tags as any}
                />
              }
            >
              {({ value, displayValue }) => (
                <SelectionList.Option value={value} key={value}>
                  {displayValue}
                </SelectionList.Option>
              )}
            </SelectionList>
            <TextField.TextArea
              placeholder="Enter your product descrioption eg: Build & leave to u..."
              rows={10}
              {...formStateHandler('productDescription')}
              error={formState.errors.productDescription}
            />
            <div>
              <h1>Price Information</h1>
              <div className="flex w-full">
                <TextField
                  type="number"
                  placeholder="$00.00"
                  className="flex-[0.7]"
                  step="0.25"
                  {...formStateHandler('productPrice')}
                  error={formState.errors.productPrice?.message}
                />
                <select
                  className="w-full bg-red-100 flex-[0.3]"
                  defaultValue={ProductPriceCurrency.USD}
                  {...formStateHandler('productCurrency')}
                >
                  <option value={ProductPriceCurrency.USD}>USD</option>
                  <option value={ProductPriceCurrency.INR}>INR</option>
                </select>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant={'neutral.solid'}
            size={'xl'}
            rounded={'lg'}
            fullWidth
            className="mt-10"
            icon={<ArrowRight color="white" size={20} />}
            iconPlacement="right"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};
