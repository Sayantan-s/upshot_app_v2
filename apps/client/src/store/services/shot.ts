import { SHOT_ENDPOINT } from '@client/constants/rest_endpoints';
import { sseStream } from '@client/helpers/httpClient';
import {
  IFetchOnboardingShotsParams,
  IPost,
  IShot,
} from '@client/store/types/shot';
import { api } from '.';

export const shotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query<Api.SuccessResponse<IPost[]>, void>({
      query: () => '/',
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        let postSSEStream: ReturnType<typeof sseStream> | null = null;
        try {
          await cacheDataLoaded;
          postSSEStream = sseStream('posts', {
            onSuccess: (eve) => {
              updateCachedData((draft) => {
                draft.data.unshift(JSON.parse(eve.data));
              });
            },
          });
        } catch {
          await cacheEntryRemoved;
        }
        await cacheEntryRemoved;
        postSSEStream?.close();
      },
    }),
    fetchOnboardingShots: builder.query<
      Api.SuccessResponse<IShot[]>,
      IFetchOnboardingShotsParams
    >({
      query: (data) => ({
        url: SHOT_ENDPOINT.NAME,
        method: 'GET',
        params: data,
      }),
    }),
  }),
});
