import { convertEpochToDate } from '@client/helpers/date';
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
      state.manualEdits.shots.entities[shotId]!.launchedAt!.selectedDate =
        action.payload.date;
      state.manualEdits.shots.entities[shotId]!.launchedAt!.hours =
        action.payload.hours;
      state.manualEdits.shots.entities[shotId]!.launchedAt!.mins =
        action.payload.mins;
      state.manualEdits.shots.entities[shotId]!.launchedAt!.timeConvention =
        action.payload.timeConvention;
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
        const shotData = action.payload.data.map((shot) => ({
          ...shot,
          launchedAt: shot.launchedAt
            ? convertEpochToDate(shot.launchedAt)
            : {
                selectedDate: undefined,
                timeConvention: TimeConvention.AM,
                hours: '',
                mins: '',
              },
        }));
        shotsAdapter.setAll(state.manualEdits.shots, shotData);
      }
    );

    // Delete editing shot
    builder.addMatcher(
      shotsApi.endpoints.deleteShot.matchFulfilled,
      (state, action) => {
        state.manualEdits.shots.isLoading = false;
        shotsAdapter.removeOne(
          state.manualEdits.shots,
          action.meta.arg.originalArgs.shotId
        );
      }
    );
  },
};
