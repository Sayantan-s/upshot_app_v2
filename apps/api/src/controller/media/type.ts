import { RequestHandler } from "express";

export interface IImageBody {
  type: string;
  config: string;
  cropMetaData: string;
}

export type ISingleImageRequestHandler = RequestHandler<
  unknown,
  unknown,
  IImageBody
>;
