import { IManualEdit } from '@client/store/types/shot';
import { createSlice } from '@reduxjs/toolkit';
import { FeedCaseReducers } from './feed/reducers';
import { fetchfeedShotState, IfetchFeedShotsState } from './feed/state';
import { ManualEditCaseReducers } from './manualedits/reducers';
import { manualEditState } from './manualedits/state';

export type ShotState = {
  manualEdits: IManualEdit;
  feed: IfetchFeedShotsState;
};

const initialState = {
  manualEdits: manualEditState,
  feed: fetchfeedShotState,
};

export const shotSlice = createSlice({
  name: 'shots',
  initialState,
  reducers: {
    ...ManualEditCaseReducers.reducers,
    ...FeedCaseReducers.reducers,
  },
  extraReducers(builder) {
    ManualEditCaseReducers.extraReducers(builder);
    FeedCaseReducers.extraReducers(builder);
  },
});

export const shotActions = shotSlice.actions;

export default shotSlice.reducer;
