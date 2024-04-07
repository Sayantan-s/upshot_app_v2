import { IManualEdit } from '@client/store/types/shot';
import { createSlice } from '@reduxjs/toolkit';
import { ManualEditCaseReducers } from './manualedits/reducers';
import { manualEditState } from './manualedits/state';

export type ShotState = {
  manualEdits: IManualEdit;
};

const initialState = {
  manualEdits: manualEditState,
};

export const shotSlice = createSlice({
  name: 'shots',
  initialState,
  reducers: {
    ...ManualEditCaseReducers.reducers,
  },
  extraReducers(builder) {
    ManualEditCaseReducers.extraReducers(builder);
  },
});

export const shotActions = shotSlice.actions;

export default shotSlice.reducer;
