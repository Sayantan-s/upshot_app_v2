import { Props as ModalProps } from '@client/components/ui/Modal/type';
import { ISingleImageUploadResponse } from '@client/store/types/media';
import { CropperProps } from 'react-easy-crop';

export interface IImageMetaData {
  file: File | null;
  base64URL: string;
}
export interface Props
  extends ModalProps,
    Partial<Pick<CropperProps, 'objectFit' | 'cropShape' | 'showGrid'>> {
  name: string;
  imageMetaData: IImageMetaData;
  cropConfiguration?: ICropState;
  aspectRatio?: IAspectRatio;
  title: string;
  imageSuggestions: string;
  onUploadComplete?: (data: ISingleImageUploadResponse) => void;
  intent: string;
}

export type IAspectRatio = 'video' | 'square';

export interface ReducerAction<T, P> {
  type: T;
  payload: P;
}

export interface ICropState {
  crop: { x: number; y: number };
  zoom: number;
  rotate: number;
}

export type ICropperAction =
  | ReducerAction<'CROP', ICropState['crop']>
  | ReducerAction<'ZOOM', ICropState['zoom']>
  | ReducerAction<'ROTATE', ICropState['rotate']>;

export type ICropperReducerFunc = (
  state: ICropState,
  action: ICropperAction
) => ICropState;
