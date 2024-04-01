import { IShot } from '@client/store/types/shot';

export interface IProps extends IShot {
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  disabled: boolean;
}
