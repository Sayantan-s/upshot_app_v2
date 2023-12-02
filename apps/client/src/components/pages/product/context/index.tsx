import { PRODUCT_TYPES } from '@client/constants/product_types';
import { StorageManager } from '@client/extras';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { IProductDetailsContext, Props } from './types';

const ProductDetailsContext = createContext<IProductDetailsContext | null>(
  null
);

const Root: FC<PropsWithChildren<Props>> = ({ children, persist }) => {
  // HOOKS
  const state = useRef(
    new StorageManager({
      // Managing a storage manager cause to handle state changes & persistence internally
      data: {
        productType: '',
        instance: '',
      },
      persistenceConfig: {
        status: !!persist,
        storageKey: 'product-details',
        removeIfEmpty: false,
      },
    })
  );

  const [productDetailInstance, setProductDetailInstance] = useState(
    state.current.get()
  );

  // HANDLERS
  const handleCreateInstance = (productType: PRODUCT_TYPES | string) => {
    const instancePayload = { productType, instance: uuid() };
    setProductDetailInstance(instancePayload);
    if (persist) {
      state.current.set('instance', instancePayload.instance);
      state.current.set('productType', instancePayload.productType);
    }
  };

  return (
    <ProductDetailsContext.Provider
      value={{ values: productDetailInstance, handleCreateInstance }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
};

const useProductDetails = () => {
  const context = useContext(ProductDetailsContext);
  if (!context) throw new Error('No Product Details Context Found!');
  return context;
};

export const ProductDetailsInstance = Object.assign(Root, {
  useProductDetails,
});
