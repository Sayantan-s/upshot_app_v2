import { useQuery } from '@apollo/client';
import { gql } from '@client/__generated__';
import { GetAllProductsQuery } from '@client/__generated__/graphql';
import { Button } from '@client/components/ui';
import { FC } from 'react';
import { useNavigate } from 'react-router';

const GET_ALL_PRODUCTS_QUERY = gql(/* GraphQL */ `
  query GetAllProducts {
    getProducts {
      productName
      productMoto
      price {
        soldAt
        currency
        amount
      }
      id
      launchedAt
      status
      createdAt
    }
  }
`);

export const Products = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS_QUERY);

  return (
    <div className="mt-4">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div className="grid grid-cols-2">
          {data?.getProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard: FC<GetAllProductsQuery['getProducts'][number]> = ({
  productName,
  productMoto,
  id,
}) => {
  const navigate = useNavigate();

  const handlePushToEditPanel = () => navigate(`/product/${id}/edit`);

  return (
    <figure className="p-4 shadow-sm border border-slate-100 rounded-lg">
      <h1 className="text-gray-700 text-base font-semibold">{productName}</h1>
      <p className="mt-1">{productMoto}</p>
      <div className="flex mt-3 space-x-1">
        <Button variant={'neutral.solid'} onClick={handlePushToEditPanel}>
          Edit Shots
        </Button>
        <Button variant={'danger.ghost'}>Delete</Button>
      </div>
    </figure>
  );
};
