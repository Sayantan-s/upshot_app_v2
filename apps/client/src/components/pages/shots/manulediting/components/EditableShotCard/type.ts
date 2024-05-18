import { ShotState } from '@client/store/slices/shots';
import { MouseEventHandler } from 'react';

type IShotModified = NonNullable<
  ShotState['manualEdits']['shots']['entities'][string]
>;
export interface IProps extends IShotModified {
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  disabled: boolean;
  isActive: boolean;
}

export interface IScheduleNotifierProps {
  shotId: string;
  disabled?: boolean;
}

export interface IShotControllerProps {
  onSave: MouseEventHandler<HTMLButtonElement>;
  onEdit: MouseEventHandler<HTMLButtonElement>;
  allowEdit: boolean;
  shotId: string;
  isActive?: boolean;
}
