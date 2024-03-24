import { RequestHandler } from 'express';

// Product Fetch

export type IShotsFetchHandler = RequestHandler<
  unknown,
  unknown,
  unknown,
  { productId: string }
>;
