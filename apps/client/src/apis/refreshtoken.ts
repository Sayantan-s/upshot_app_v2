import { AUTH_ENDPOINT } from '@client/constants/rest_endpoints';
import { IRefreshResponse } from '@client/store/types/auth';
import { upshotApi } from '.';

export const getRefreshToken = async () => {
  const data = await upshotApi.get<Api.SuccessResponse<IRefreshResponse>>(
    AUTH_ENDPOINT.REFRESH
  );
  return data.data;
};
