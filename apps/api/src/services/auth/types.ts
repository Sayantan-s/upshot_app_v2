export interface ISignAccessTokenParams<TMetaData> {
  payload: TMetaData;
  expiresIn?: string;
}

export interface ISignRefreshTokenParams<TMetaData> {
  payload: TMetaData;
  expiresIn?: string;
}
