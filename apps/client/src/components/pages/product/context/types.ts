import { PRODUCT_TYPES } from '@client/constants/product_types';

export interface IProductDetailInstanceValues {
  productType: PRODUCT_TYPES | string;
  instance: string;
}

export interface IProductDetailsContext {
  values: IProductDetailInstanceValues;
  handleCreateInstance: (productType: string) => void;
}

export interface Props {
  persist?: boolean;
}

export interface IProductTrackerProps {
  productType: keyof typeof PRODUCT_TYPES;
  children: JSX.Element | JSX.Element[] | null;
}
