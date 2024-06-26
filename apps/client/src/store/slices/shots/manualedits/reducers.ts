import { convertUTCEpochToDate } from '@client/helpers/date';
import { shotsApi } from '@client/store/services/shot';
import {
  ArchiveStatus,
  IChooseToEdit,
  IDateFormatter,
  IManualEdit,
  IShot,
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
    setArchivedStatus: (
      state: Draft<ShotState>,
      action: PayloadAction<ArchiveStatus>
    ) => {
      state.manualEdits.archived = action.payload;
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

        if (action.payload.data.length) {
          const shotData = action.payload.data.map((shot) => ({
            ...shot,
            launchedAt: shot.launchedAt
              ? convertUTCEpochToDate(shot.launchedAt)
              : {
                  selectedDate: undefined,
                  hours: '',
                  mins: '',
                },
          }));

          shotsAdapter.setAll(state.manualEdits.shots, shotData);

          const archiveStore = shotData.reduce(
            (acc, shot) => {
              if (shot.isArchived) acc.archived.push(shot.id);
              if (!shot.isArchived) acc.unArchived.push(shot.id);
              return acc;
            },
            {
              archived: [],
              unArchived: [],
            } as Pick<IManualEdit['shots'], 'archived' | 'unArchived'>
          );

          state.manualEdits.shots.archived = archiveStore.archived;
          state.manualEdits.shots.unArchived = archiveStore.unArchived;
        } else {
          shotsAdapter.removeAll(state.manualEdits.shots);
          state.manualEdits.shots.archived = [];
          state.manualEdits.shots.unArchived = [];
        }
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
