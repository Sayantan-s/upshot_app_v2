import { RequestHandler } from 'express';

// Product Fetch

type IBooleanParams = 'true' | 'false';

export type IShotsFetchHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  { productId: string; isArchived: IBooleanParams; search?: string }
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
