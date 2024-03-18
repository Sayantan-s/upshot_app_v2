import { RequestHandler } from 'express';

export interface IImageBody {
  type: string;
  config: string;
  cropMetaData: string;
  intent: string;
  name: string;
}

export type ISingleImageRequestHandler = RequestHandler<
  unknown,
  unknown,
  IImageBody
>;
