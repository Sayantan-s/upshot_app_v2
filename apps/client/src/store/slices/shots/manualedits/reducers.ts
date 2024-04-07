import { shotsApi } from '@client/store/services/shot';
import {
  IChooseToEdit,
  IDateFormatter,
  IShot,
  TimeConvention,
} from '@client/store/types/shot';
import {
  ActionReducerMapBuilder,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { addHours, addMinutes, getUnixTime, parseISO } from 'date-fns';
import { ShotState } from '..';
import { shotsAdapter } from './state';

export const ManualEditCaseReducers = {
  reducers: {
    setupCurrentlyEditing: (
      state: Draft<ShotState>,
      action: PayloadAction<IChooseToEdit>
    ) => {
      const { chosenEditingShotId } = action.payload;
      state.manualEdits.currentlyEditing = chosenEditingShotId;
    },
    updateLaunchDate: (
      state: Draft<ShotState>,
      action: PayloadAction<IDateFormatter>
    ) => {
      const shotId = state.manualEdits.currentlyEditing;
      const date = parseISO(action.payload.date.toISOString());
      const hrs =
        action.payload.timeConvention === TimeConvention.PM
          ? +action.payload.hours + 12
          : +action.payload.hours;
      addHours(date, hrs);
      addMinutes(date, +action.payload.mins);
      state.manualEdits.shots.entities[shotId]!.launchedAt = getUnixTime(date);
    },
    flushCurrentlyEditing: (state: Draft<ShotState>) => {
      state.manualEdits.currentlyEditing = '';
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<ShotState>) => {
    // Fetching manual editing slots
    builder.addMatcher(
      shotsApi.endpoints.fetchOnboardingShots.matchPending,
      (state) => {
        state.manualEdits.shots.isLoading = true;
      }
    );

    // Fetched manual editing slots and pushed to state
    builder.addMatcher(
      shotsApi.endpoints.fetchOnboardingShots.matchFulfilled,
      (state, action: PayloadAction<Api.SuccessResponse<IShot[]>>) => {
        state.manualEdits.shots.isLoading = false;
        shotsAdapter.setAll(state.manualEdits.shots, action.payload.data);
      }
    );
  },
};
