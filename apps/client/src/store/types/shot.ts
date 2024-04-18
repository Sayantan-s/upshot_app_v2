import { EntityState } from '@reduxjs/toolkit';
import { User } from './auth';
import { EProductStatus } from './product';

export type Activity = 'promote' | 'sell';

export type PostDetails = {
  heading: string;
  body: string;
  images?: string[];
  salePrice?: number;
};

export interface IPost {
  id: string;
  activity: Activity;
  details: PostDetails;
  userId: string;
  updated_at: Date;
  created_at: Date;
  likes: number;
  user?: User;
}

export interface InitialStateOfPosts {
  posts: IPost[];
}

export type TCreatePost = {
  activity: Activity | '';
  details: PostDetails;
};

export interface IFetchOnboardingShotsParams {
  productId: string;
}

export enum CreationMethod {
  GEN_AI = 'GEN_AI',
  MANUAL = 'MANUAL',
}

export enum ShotStatus {
  IDLE = 'IDLE',
  SCHEDULED = 'SCHEDULED',
  SHOOT = 'SHOOT',
}

export interface IShot {
  id: string;
  title: string;
  content: string;
  productType: EProductStatus;
  status: ShotStatus;
  votes: number;
  media: string[];
  launchedAt: number | null;
  creationMethod: CreationMethod | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  productId: string;
}

export interface IManualEdit {
  shots: EntityState<
    Omit<IShot, 'launchedAt'> & { launchedAt?: ILaunchedAtClientState }
  > & { isLoading: boolean; error: string };
  currentlyEditing: string;
}

export interface ILaunchedAtClientState {
  selectedDate: Date | undefined;
  hours: string;
  mins: string;
  timeConvention: TimeConvention;
}

// ManualEditReducers:: Type

export interface IChooseToEdit {
  chosenEditingShotId: string;
}

export enum TimeConvention {
  AM = 'AM',
  PM = 'PM',
}
export interface IDateFormatter {
  timeConvention: TimeConvention;
  hours: string;
  mins: string;
  date: Date;
}

export type IScheduleAllRequest = Pick<IShot, 'productId'>;
export interface IScheduleAllResponse {
  success: string[] | null;
  failed: string[] | null;
}
