import { GetShotsQuery, ShotInput } from '@client/__generated__/graphql';
import { SHOT_ENDPOINT } from '@client/constants/rest_endpoints';
import { apolloClient } from '@client/integrations/apollo';
import { UPDATE_SHOT_MUTATION } from '@client/integrations/gql/shots/mutations';
import { FETCH_SHOTS_FEED_QUERY } from '@client/integrations/gql/shots/queries';
import { SUBSCRIBE_TO_NEW_SHOT_SUBSCRIPTION } from '@client/integrations/gql/shots/subscriptions';
import {
  ICreateShotRequest,
  ICreateShotResponse,
  IFetchOnboardingShotsParams,
  IScheduleAllRequest,
  IScheduleAllResponse,
  IScheduleOneRequest,
  IScheduleOneResponse,
  IShot,
  ShotStatus,
} from '@client/store/types/shot';
import { api, Tags } from '.';

export const shotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeedShots: builder.query<GetShotsQuery['getShots'], void>({
      queryFn: async () => {
        const data = await apolloClient.query({
          query: FETCH_SHOTS_FEED_QUERY,
        });
        return { data: data.data.getShots };
      },
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          apolloClient
            .subscribe({ query: SUBSCRIBE_TO_NEW_SHOT_SUBSCRIPTION })
            .subscribe({
              next: (data) => {
                updateCachedData((draft) => {
                  console.log(data.data?.lauchShot);
                  draft.unshift(data.data!.lauchShot!);
                });
              },
            });
        } catch {
          await cacheEntryRemoved;
        }
        await cacheEntryRemoved;
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
                type: Tags.SHOT,
                id: 'LIST',
              },
              ...result.data.map(({ id }) => ({
                type: Tags.SHOT,
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
      providesTags: (result) => [{ type: Tags.SHOT, id: result?.id }],
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

    scheduleOne: builder.mutation<
      Api.SuccessResponse<IScheduleOneResponse>,
      IScheduleOneRequest
    >({
      query: (data) => ({
        url: SHOT_ENDPOINT.SCHEDULE_ONE(data.id),
        method: 'POST',
      }),
    }),
  }),
});
