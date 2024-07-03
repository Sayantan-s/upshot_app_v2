import { AUTH_ENDPOINT } from '@client/constants/rest_endpoints';
import { RootState } from '@client/store';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { saveCredentials } from '../slices/auth';
import { IRefreshResponse } from '../types/auth';

export enum Tags {
  PRODUCT = 'PRODUCT',
  SHOT = 'SHOT',
}

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_ORIGIN}/api/v1`,
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
  if (res.error?.status === 403 || res.error?.status === 401) {
    res = await baseQuery(AUTH_ENDPOINT.REFRESH, api, extraOptions);
    if (res.data) {
      const result = res.data as Api.SuccessResponse<IRefreshResponse>;
      api.dispatch(saveCredentials(result));
      res = await baseQuery(args, api, extraOptions);
    }
  }
  return res;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [Tags.PRODUCT, Tags.SHOT],
});
