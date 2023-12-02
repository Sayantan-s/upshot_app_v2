import { RootState, store } from '@client/store';

export const getState = (key: keyof RootState): RootState[typeof key] =>
  store.getState()[key];
