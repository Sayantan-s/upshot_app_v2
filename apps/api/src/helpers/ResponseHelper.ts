import { randomUUID } from "crypto";
import { Response } from "express";

interface ISuccessResponseMetaData<TResponse> {
  statusCode?: number;
  data?: TResponse;
}

interface IErrorResponseMetaData<TResponse> {
  statusCode?: number;
  data: TResponse;
}

export default class H {
  requestId: string;
  constructor() {
    this.requestId = randomUUID();
  }

  static success<TResponse = unknown>(
    response: Response,
    metaData: ISuccessResponseMetaData<TResponse>
  ) {
    const res = new H();
    response
      .status(metaData.statusCode || 200)
      .send({ ...res, ...metaData, success: true });
  }
  static error<TResponse = unknown>(
    response: Response,
    metaData: IErrorResponseMetaData<TResponse>
  ) {
    const res = new H();
    response
      .status(metaData.statusCode || 500)
      .send({ ...res, ...metaData, success: false });
  }
}
