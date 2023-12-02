import { AUTH_ENDPOINT } from '@client/constants/rest_endpoints';
import { RootState } from '@client/store';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_ORIGIN,
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const { auth } = api.getState() as RootState;
    headers.set('X-API-KEY', import.meta.env.VITE_API_KEY);
    if (auth.accessToken)
      headers.set('authorization', `Bearer ${auth.accessToken!}`);
    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let res = await baseQuery(args, api, extraOptions);
  if (res.error?.status === 403) {
    res = await baseQuery(AUTH_ENDPOINT.REFRESH, api, extraOptions);
    if (res.data) {
      res = await baseQuery(args, api, extraOptions);
    }
  }
  return res;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
