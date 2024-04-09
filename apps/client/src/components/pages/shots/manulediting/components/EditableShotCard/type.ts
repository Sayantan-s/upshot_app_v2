import { ShotState } from '@client/store/slices/shots';

type IShotModified = NonNullable<
  ShotState['manualEdits']['shots']['entities'][string]
>;
export interface IProps extends IShotModified {
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  disabled: boolean;
}

export interface IScheduleNotifierProps {
  shotId: string;
}
