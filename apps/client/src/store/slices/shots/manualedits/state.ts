import { ArchiveStatus } from '@client/store/types/shot';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { ShotState } from '..';

export const shotsAdapter = createEntityAdapter<
  NonNullable<ShotState['manualEdits']['shots']['entities'][string]>
>({
  selectId: (data) => data.id,
});

export const manualEditState: ShotState['manualEdits'] = {
  shots: shotsAdapter.getInitialState({
    isLoading: false,
    error: '',
    archived: [],
    unArchived: [],
  }),
  currentlyEditing: '',
  archived:
    new URLSearchParams(window.location.search).get('archived') === 'true'
      ? ArchiveStatus.ARCHIVED
      : ArchiveStatus.UNARCHIVED,
};
