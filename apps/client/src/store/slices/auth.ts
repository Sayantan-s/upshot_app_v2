import { IAuthResponse, User } from '@client/store/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = IAuthResponse & { user: User | null };

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveCredentials: (
      state,
      { payload: { data } }: PayloadAction<Api.SuccessResponse<IAuthResponse>>
    ) => {
      const { accessToken } = data;
      if (accessToken) state.accessToken = accessToken;
    },

    saveUser: (
      state,
      { payload }: PayloadAction<Api.SuccessResponse<User>>
    ) => {
      state.user = payload.data;
    },
    removeCredentials: (state) => {
      state.accessToken = null;
    },
    flushAuth: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { removeCredentials, saveCredentials, saveUser, flushAuth } =
  authSlice.actions;

export default authSlice.reducer;
