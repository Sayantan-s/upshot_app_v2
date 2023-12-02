import { FC } from 'react';
import { ProductDetailsInstance } from '../../context';
import { withProductInformationLayout } from '../../layout';

export const productSellInitialState = {
  productName: '',
  productMoto: '',
  time: '',
};

const Component: FC = () => {
  const { values } = ProductDetailsInstance.useProductDetails();
  return <div>ProductSell</div>;
};

export const ProductSellInformation = withProductInformationLayout(Component);
