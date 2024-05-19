import { ArchiveStatus } from '@prisma/client';
import { RequestHandler } from 'express';

// Product Fetch

export type IShotsFetchHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  { productId: string; archiveStatus: ArchiveStatus }
>;

export type IShotsScheduleRegistrationHandler = RequestHandler<
  { shotId: string },
  unknown,
  unknown
>;

export interface IShotExecuterRequest {
  shotId: string;
  scheduleReference: string;
}

export type IShotsScheduleExecuterHandler = RequestHandler<
  unknown,
  unknown,
  IShotExecuterRequest
>;

export type IShotsScheduleAllRegistrationHandler = RequestHandler<
  { productId: string },
  unknown,
  unknown
>;

export type INewShotAddHandler = RequestHandler<
  unknown,
  unknown,
  { productId: string }
>;

export type IFetchShotHandler = RequestHandler<
  { shotId: string },
  unknown,
  unknown
>;
