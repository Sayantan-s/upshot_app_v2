///api/v1/ai/product_inputs
import { MEDIA_ENDPOINT } from '@client/constants/rest_endpoints';
import { api } from '.';
import { ISingleImageUploadResponse } from '../types/media';

export const mediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleImage: builder.mutation<
      Api.SuccessResponse<ISingleImageUploadResponse>,
      FormData
    >({
      query: (credentials) => ({
        url: MEDIA_ENDPOINT.SINGLE_IMAGE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
