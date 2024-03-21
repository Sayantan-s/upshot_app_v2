import { useQuery } from '@apollo/client';
import { gql } from '@client/__generated__';

const GET_ALL_PRODUCTS_QUERY = gql(/* GraphQL */ `
  query GetAllProducts {
    getProducts {
      productName
      launchedAt
      createdAt
      createdBy
      tags
      id
      price {
        amount
        currency
        soldAt
      }
    }
  }
`);

export const Products = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS_QUERY);

  return (
    <div className="">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        JSON.stringify(data?.getProducts)
      )}
    </div>
  );
};
