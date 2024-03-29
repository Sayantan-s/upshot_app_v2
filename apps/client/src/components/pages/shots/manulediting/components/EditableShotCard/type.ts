import { IShot } from '@client/store/types/shot';

export interface IProps extends IShot {
  onEditAndSave: (data: string | null) => void;
  disabled: boolean;
}
