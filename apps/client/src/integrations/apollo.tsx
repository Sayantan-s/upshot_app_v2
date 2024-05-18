import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NextLink,
  Operation,
  createHttpLink,
  fromPromise,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { getRefreshToken } from '@client/apis/refreshtoken';
import { store } from '@client/store';
import { saveCredentials } from '@client/store/slices/auth';
import { IRegisterResponse } from '@client/store/types/auth';
import { createClient } from 'graphql-ws';
import { FC, PropsWithChildren } from 'react';

function refreshAndResolvePendingRequests(
  res: void | Api.SuccessResponse<IRegisterResponse>,
  operation: Operation,
  forward: NextLink
) {
  const oldHeaders = operation.getContext().headers;
  operation.setContext({
    headers: {
      ...oldHeaders,
      authorization: `Bearer ${res?.data.accessToken}`,
    },
  });
  store.dispatch(saveCredentials(res!));
  return forward(operation);
}

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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 401) {
          return fromPromise(
            getRefreshToken().catch(() => {
              return;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((data) =>
              refreshAndResolvePendingRequests(data, operation, forward)
            );
        }
      }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);

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
  ApolloLink.from([errorLink, authLink, httpLink])
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const Apollo: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
