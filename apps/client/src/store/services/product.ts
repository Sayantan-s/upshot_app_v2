///api/v1/ai/product_inputs
import {
  AI_ENDPOINT,
  PRODUCT_ENDPOINT,
} from '@client/constants/rest_endpoints';
import { ProductTags, api } from '.';
import {
  ICreateProduct,
  IFetchProduct,
  IGenerationRequest,
  IGenerationResponse,
  IProduct,
  IUpdateProduct,
} from '../types/product';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generate: builder.mutation<
      Api.SuccessResponse<IGenerationResponse>, // email, userName, pwd
      IGenerationRequest
    >({
      query: (credentials) => ({
        url: AI_ENDPOINT.GENERATE_PRODUCT_ONBOARDING,
        method: 'POST',
        body: credentials,
      }),
    }),
    fetch: builder.query<Api.SuccessResponse<IProduct>, IFetchProduct>({
      query: (credentials) => ({
        url: `${PRODUCT_ENDPOINT.NAME}/${credentials.id}`,
        method: 'GET',
      }),
      providesTags: (...args) => {
        const { id } = args[2];
        return [{ type: ProductTags.PRODUCT, id }];
      },
    }),
    create: builder.mutation<Api.SuccessResponse<string>, ICreateProduct>({
      query: (credentials) => ({
        url: PRODUCT_ENDPOINT.NAME,
        method: 'POST',
        body: credentials,
      }),
    }),
    update: builder.mutation<Api.SuccessResponse<null>, IUpdateProduct>({
      query: ({ id, ...data }) => ({
        url: `${PRODUCT_ENDPOINT.NAME}/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    finalise: builder.mutation<Api.SuccessResponse<null>, Pick<IProduct, 'id'>>(
      {
        query: ({ id }) => ({
          url: `${PRODUCT_ENDPOINT.NAME}/${id}/finalise`,
          method: 'PATCH',
        }),
      }
    ),
  }),
});
