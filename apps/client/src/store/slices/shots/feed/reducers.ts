import { GetShotsQuery } from '@client/__generated__/graphql';
import { shotsApi } from '@client/store/services/shot';
import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { ShotState } from '..';
import { productsAdapter, shotsAdapter, usersAdapter } from './state';

export const FeedCaseReducers = {
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<ShotState>) => {
    // Fetching feed shots
    builder.addMatcher(
      shotsApi.endpoints.fetchFeedShots.matchPending,
      (state) => {
        state.feed.loading = true;
        state.feed.error = '';
      }
    );

    // Fetched manual editing slots and pushed to state
    builder.addMatcher(
      shotsApi.endpoints.fetchFeedShots.matchFulfilled,
      (state, action: PayloadAction<GetShotsQuery['getShots']>) => {
        state.feed.loading = false;
        state.feed.error = '';
        state.feed.success = true;
        const responseClone = structuredClone(action.payload);
        responseClone.forEach((shotEntry) => {
          usersAdapter.addOne(state.feed.data.users, shotEntry.product?.user);
          delete shotEntry.product?.user;
          productsAdapter.addOne(state.feed.data.products, shotEntry!.product!);
          delete shotEntry.product;
          shotsAdapter.addOne(state.feed.data.shots, shotEntry);
        });
      }
    );
  },
};
