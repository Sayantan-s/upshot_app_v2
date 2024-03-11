///api/v1/ai/product_inputs
import {
  AI_ENDPOINT,
  PRODUCT_ENDPOINT,
} from '@client/constants/rest_endpoints';
import { api } from '.';
import {
  ICreateProduct,
  IGenerationRequest,
  IGenerationResponse,
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
    create: builder.mutation<Api.SuccessResponse<string>, ICreateProduct>({
      query: (credentials) => ({
        url: PRODUCT_ENDPOINT.CREATE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
