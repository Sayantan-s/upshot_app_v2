import { PRODUCT_TYPES } from '@client/constants/product_types';
import { createContext, useContext, useState } from 'react';
import { buildInPublicInitialState } from '../products/BuildInPublicDetails';
import { productSellInitialState } from '../products/ProductSellDetails';
import { IProductTrackerProps } from './types';

const productState = {
  [PRODUCT_TYPES.BUILD_IN_PUBLIC]: buildInPublicInitialState,
  [PRODUCT_TYPES.PRODUCT_SELL]: productSellInitialState,
};

interface IContext {
  state: (typeof productState)[keyof typeof PRODUCT_TYPES];
  handleSetProduct: (key: string, value: string) => void;
}

const ProductTrackerContext = createContext<IContext | null>(null);

const useProductTracker = () => {
  const context = useContext(ProductTrackerContext);
  if (!context) throw new Error('No Product tracker context found!');
  return context;
};

const Tracker = ({ productType, children }: IProductTrackerProps) => {
  const [product, setProduct] = useState(productState[productType]);

  const handleSetProduct = (key: string, value: string) => {
    setProduct((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <ProductTrackerContext.Provider
      value={{ handleSetProduct, state: product }}
    >
      {children}
    </ProductTrackerContext.Provider>
  );
};

export const ProductTracker = Object.assign(Tracker, { useProductTracker });
