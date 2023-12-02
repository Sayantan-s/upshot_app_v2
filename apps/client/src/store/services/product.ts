///api/v1/ai/product_inputs
import { PRODUCT_ENDPOINT } from '@client/constants/rest_endpoints';
import { api } from '.';
import {
  IGenerateResponseTranscriptCVs,
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
        url: PRODUCT_ENDPOINT.GENERATE,
        method: 'POST',
        body: credentials,
      }),
    }),
    generateTranscriptBasedCVs: builder.mutation<
      Api.SuccessResponse<IGenerateResponseTranscriptCVs>,
      FormData
    >({
      query: (credentials) => ({
        url: PRODUCT_ENDPOINT.GENERATE_CV,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
