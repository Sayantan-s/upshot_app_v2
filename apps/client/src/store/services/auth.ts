import { AUTH_ENDPOINT } from '@client/constants/rest_endpoints';
import { router } from '@client/pages/AppRoutes';
import {
  IEasyResponse,
  ILoginRequest,
  ILoginResponse,
  IRefreshRequest,
  IRefreshResponse,
  IRegisterRequest,
  IRegisterResponse,
  User,
} from '@client/store/types/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { api } from '.';
import { flushAuth, saveCredentials, saveUser } from '../slices/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      Api.SuccessResponse<IRegisterResponse>, // email, userName, pwd
      IRegisterRequest
    >({
      query: (credentials) => ({
        url: AUTH_ENDPOINT.REGISTER,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveCredentials(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    login: builder.mutation<Api.SuccessResponse<ILoginResponse>, ILoginRequest>( // identity, pwd
      {
        query: (credentials) => ({
          url: AUTH_ENDPOINT.LOGIN,
          method: 'POST',
          body: credentials,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(saveCredentials(data));
          } catch (error) {
            const err = error as FetchBaseQueryError;
            console.log(err);
          }
        },
      }
    ),

    logout: builder.mutation<Api.SuccessResponseNoPayload, unknown>({
      query: () => ({
        url: AUTH_ENDPOINT.LOGOUT,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(flushAuth());
          router.navigate('/login', { replace: true });
          dispatch(api.util.resetApiState());
        } catch (error) {
          console.log(error);
          router.navigate('/', { replace: true });
        }
      },
    }),

    refresh: builder.query<
      Api.SuccessResponse<IRefreshResponse>,
      Partial<IRefreshRequest>
    >({
      query: () => ({
        url: AUTH_ENDPOINT.REFRESH,
        method: 'GET',
      }),
      async onQueryStarted(
        { resetOnFailure = true },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveCredentials(data));
        } catch (error) {
          if (resetOnFailure) {
            dispatch(flushAuth());
            dispatch(api.util.resetApiState());
            router.navigate('/login', { replace: true });
          }
        }
      },
    }),

    easy: builder.mutation<Api.SuccessResponse<IEasyResponse>, unknown>({
      query: () => ({
        url: AUTH_ENDPOINT.EASY,
        method: 'POST',
        body: { email: import.meta.env.VITE_FREE_ACCESS_EMAIL },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveCredentials(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    user: builder.query<Api.SuccessResponse<User>,unknown>({
      query: (param) => ({
        url: AUTH_ENDPOINT.USER,
        medthod: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveUser(data));
        } catch (error) {
          dispatch(flushAuth());
          dispatch(api.util.resetApiState());
          router.navigate('/login', { replace: true });
        }
      },
    }),
  }),
});
