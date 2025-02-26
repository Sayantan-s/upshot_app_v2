import type { EntityState } from '@reduxjs/toolkit';
import type { User } from './auth';
import type { EProductStatus } from './product';

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
  search?: string;
}

export enum CreationMethod {
  GEN_AI = 'GEN_AI',
  MANUAL = 'MANUAL',
}

export enum ShotStatus {
  IDLE = 'IDLE',
  SCHEDULED = 'SCHEDULED',
  SHOOT = 'SHOOT',
  DELETED = 'DELETED',
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
  tweet: boolean;
  isArchived: boolean;
}

export enum ArchiveStatus {
  ARCHIVED = 'ARCHIVED',
  UNARCHIVED = 'UNARCHIVED',
}

export interface IManualEdit {
  shots: EntityState<
    Omit<IShot, 'launchedAt'> & { launchedAt?: ILaunchedAtClientState }
  > & {
    isLoading: boolean;
    error: string;
    archived: string[];
    unArchived: string[];
  };
  currentlyEditing: string;
  archived: ArchiveStatus;
}

export interface ILaunchedAtClientState {
  selectedDate: Date | undefined;
  hours: string;
  mins: string;
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
  hours: string;
  mins: string;
  date: Date | undefined;
}

export type IScheduleOneRequest = Pick<IShot, 'id'>;
export interface IScheduleOneResponse {
  success: string | null;
  failed: string | null;
}

export type IScheduleAllRequest = Pick<IShot, 'productId'>;
export interface IScheduleAllResponse {
  success: string[] | null;
  failed: string[] | null;
}

export type ICreateShotRequest = Pick<IShot, 'productId'>;
export interface ICreateShotResponse {
  shotId: string;
}
