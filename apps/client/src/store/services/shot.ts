import { gql } from '@client/__generated__';
import { ShotInput } from '@client/__generated__/graphql';
import { SHOT_ENDPOINT } from '@client/constants/rest_endpoints';
import { sseStream } from '@client/helpers/httpClient';
import { apolloClient } from '@client/integrations/apollo';
import {
  IFetchOnboardingShotsParams,
  IPost,
  IScheduleAllRequest,
  IScheduleAllResponse,
  IShot,
  ShotStatus,
} from '@client/store/types/shot';
import { Tags, api } from '.';

const UPDATE_SHOT_MUTATION = gql(/* GraphQL */ `
  mutation UpdateShot($shotId: ID!, $shotInput: ShotInput!) {
    updateShot(shotId: $shotId, shotInput: $shotInput)
  }
`);

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
      providesTags: (result) =>
        result?.data
          ? [
              {
                type: Tags.SHOT as const,
                id: 'LIST',
              },
              ...result.data.map(({ id }) => ({
                type: Tags.SHOT as const,
                id,
              })),
              Tags.SHOT,
            ]
          : [Tags.SHOT],
    }),

    fetchShot: builder.query<IShot, { shotId: string }>({
      query: ({ shotId }) => ({
        url: SHOT_ENDPOINT.GET(shotId),
        method: 'GET',
      }),
      providesTags: (result, _) => [{ type: Tags.SHOT, id: result?.id }],
    }),

    createShot: builder.mutation<
      Api.SuccessResponse<ICreateShotResponse>,
      ICreateShotRequest
    >({
      query: (body) => ({
        url: SHOT_ENDPOINT.NAME,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: Tags.SHOT, id: 'LIST' }],
    }),

    updateShot: builder.mutation<
      unknown,
      { shotId: string; shotInput: ShotInput }
    >({
      queryFn: async (args) => {
        const data = await apolloClient.mutate({
          mutation: UPDATE_SHOT_MUTATION,
          variables: args,
        });
        return { data: data.data?.updateShot };
      },
    }),

    deleteShot: builder.mutation<unknown, { shotId: string }>({
      queryFn: async ({ shotId }) => {
        await apolloClient.mutate({
          mutation: UPDATE_SHOT_MUTATION,
          variables: { shotId, shotInput: { status: ShotStatus.DELETED } },
        });
        return { data: 'Success' };
      },
    }),

    scheduleAll: builder.mutation<
      Api.SuccessResponse<IScheduleAllResponse>,
      IScheduleAllRequest
    >({
      query: (data) => ({
        url: SHOT_ENDPOINT.SCHEDULE_ALL(data.productId),
        method: 'POST',
      }),
    }),
  }),
});
