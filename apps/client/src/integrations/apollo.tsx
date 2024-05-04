import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { store } from '@client/store';
import { createClient } from 'graphql-ws';
import { FC, PropsWithChildren } from 'react';

const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  };
});

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_ORIGIN}/api/v1/gql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_WS_ORIGIN,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
export const Apollo: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
