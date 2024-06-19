import { GetShotsQuery } from '@client/__generated__/graphql';
import { shotsApi } from '@client/store/services/shot';
import {
  ActionReducerMapBuilder,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ShotState } from '..';
import {
  IFeedShot,
  productsAdapter,
  shotsAdapter,
  usersAdapter,
} from './state';

export const FeedCaseReducers = {
  reducers: {
    addOneShotToFeed: (
      state: Draft<ShotState>,
      action: PayloadAction<IFeedShot>
    ) => {
      const payload = structuredClone(action.payload);
      usersAdapter.addOne(state.feed.data.users, payload.product?.user);
      delete payload.product?.user;
      productsAdapter.addOne(state.feed.data.products, payload.product!);
      delete payload.product;
      shotsAdapter.addOne(state.feed.data.shots, payload);
    },
  },

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

        usersAdapter.addMany(
          state.feed.data.users,
          responseClone.map((item) => item.product?.user)
        );
        productsAdapter.addMany(
          state.feed.data.products,
          responseClone.map((item) => item.product!)
        );
        shotsAdapter.addMany(state.feed.data.shots, responseClone);
      }
    );
  },
};
