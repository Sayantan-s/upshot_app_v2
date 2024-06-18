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

        usersAdapter.addMany(
          state.feed.data.users,
          responseClone.map((item) => item.product?.user)
        );
        productsAdapter.addMany(
          state.feed.data.products,
          responseClone.map((item) => item.product!)
        );
        shotsAdapter.addMany(state.feed.data.shots, responseClone);

        // responseClone.forEach((shotEntry, index) => {
        //   console.log('START', index);
        //   usersAdapter.setOne(state.feed.data.users, shotEntry.product?.user);
        //   console.log('USER', index, shotEntry.product?.user);
        //   delete shotEntry.product?.user;
        //   productsAdapter.setOne(state.feed.data.products, shotEntry!.product!);
        //   console.log('PRODUCT', index);
        //   delete shotEntry.product;
        //   shotsAdapter.setOne(state.feed.data.shots, shotEntry);
        //   console.log('SHOT', index);
        //   console.log('END', index);
        // });
      }
    );
  },
};
