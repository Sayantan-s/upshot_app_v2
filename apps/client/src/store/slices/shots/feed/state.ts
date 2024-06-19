import { GetShotsQuery } from '@client/__generated__/graphql';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export type IFeedShot = GetShotsQuery['getShots'][number];
export type IFeedProduct = NonNullable<IFeedShot['product']>;
export type IFeedUser = NonNullable<IFeedProduct>['user'];

export interface IfetchFeedShotsState {
  loading: boolean;
  error: string;
  success: boolean;
  data: {
    users: EntityState<IFeedUser>;
    products: EntityState<IFeedProduct>;
    shots: EntityState<IFeedShot>;
  };
}

export const usersAdapter = createEntityAdapter<IFeedUser>();
const usersInitialState = usersAdapter.getInitialState();

export const productsAdapter = createEntityAdapter<IFeedProduct>();
const productsInitialState = productsAdapter.getInitialState();

export const shotsAdapter = createEntityAdapter<IFeedShot>({
  sortComparer: (shotA, shotB) =>
    shotA.launchedAt! > shotB.launchedAt! ? -1 : 1,
});
const shotsInitialState = shotsAdapter.getInitialState();

export const fetchfeedShotState: IfetchFeedShotsState = {
  loading: false,
  error: '',
  success: false,
  data: {
    users: usersInitialState,
    products: productsInitialState,
    shots: shotsInitialState,
  },
};
