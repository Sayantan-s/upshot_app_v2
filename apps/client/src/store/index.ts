import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import * as rr from 'react-redux';
import { api } from './services';
import authReducer from './slices/auth';
import shotReducer from './slices/shots';

const middlewares = [api.middleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shots: shotReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = rr.useDispatch;
export const useSelector: rr.TypedUseSelectorHook<RootState> = rr.useSelector;
export const getStore = (): ToolkitStore<RootState> => store;
