import { sseStream } from '@client/helpers/httpClient';
import { IPost, TCreatePost } from '@client/store/types/posts';
import { api } from '.';

export const postsApi = api.injectEndpoints({
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
    createPost: builder.mutation<Api.SuccessResponseNoPayload, TCreatePost>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
