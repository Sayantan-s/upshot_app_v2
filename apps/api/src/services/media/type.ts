import { RequestHandler } from "express";

export type IUploadSingle = [RequestHandler];

export interface ICropState {
  crop: { x: number; y: number };
  zoom: number;
  rotate: number;
}

export interface ICropArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface ICropInput {
  file: Express.Multer.File;
  config: ICropState;
  metaData: ICropArea;
}
