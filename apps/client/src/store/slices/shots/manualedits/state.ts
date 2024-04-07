import { IShot } from '@client/store/types/shot';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { ShotState } from '..';

export const shotsAdapter = createEntityAdapter<IShot>({
  selectId: (data) => data.id,
});

export const manualEditState: ShotState['manualEdits'] = {
  shots: shotsAdapter.getInitialState({
    isLoading: false,
    error: '',
  }),
  currentlyEditing: '',
};
