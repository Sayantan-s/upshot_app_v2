import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '@client/store';
import { FC, PropsWithChildren } from 'react';

const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_ORIGIN}/gql`,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});
export const Apollo: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
