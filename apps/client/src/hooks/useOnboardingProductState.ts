import { PRDOUCT_TYPE_TAGS } from '@client/constants/tags/producttype';
import { productApi } from '@client/store/services/product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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

export const useOnboardingProductState = () => {
  const [params] = useSearchParams();
  const productId = params.get('product');
  const mode = params.get('status');
  const [state, setState] = useState(buildInPublicInitialState);
  const [isPreviouslySavedDataPopulated, setsPreviouslySavedDataPopulated] =
    useState(false);
  const { isSuccess, data, isFetching, ...rest } = productApi.useFetchQuery(
    { id: productId! },
    {
      skip: !(!!productId || !!mode),
    }
  );

  useEffect(() => {
    if (!isFetching && isSuccess && data?.data) {
      const { id, productName, productDescription, productMoto, media, tags } =
        data.data;
      setState({
        productId: id,
        productName,
        productMoto,
        productDescription,
        productLogo: media?.productLogo || '',
        productCover: media?.productCover || '',
        tags: tags.reduce((acc, curr) => {
          const presentTag = PRDOUCT_TYPE_TAGS.find(
            (tagData) => tagData.value === curr
          );
          presentTag && acc.push(presentTag);
          return acc;
        }, [] as typeof PRDOUCT_TYPE_TAGS),
      });
      setsPreviouslySavedDataPopulated(true);
    }
  }, [data?.data, isSuccess, isFetching]);

  console.log(isPreviouslySavedDataPopulated);

  return {
    state,
    productId,
    mode,
    isPreviouslySavedDataPopulated,
    apiStatus: { ...rest, isSuccess, isFetching },
  };
};
