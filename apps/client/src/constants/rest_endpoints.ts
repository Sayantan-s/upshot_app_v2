export enum AUTH_ENDPOINT {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  REFRESH = "/auth/refresh",
  LOGOUT = "/auth/logout",
  EASY = "/auth/easy",
  USER = "/auth/user",
}

export enum PRODUCT_ENDPOINT {
  GENERATE = "/ai/product_inputs",
  GENERATE_CV = "/ai/transcript_cvs",
}

export enum MEDIA_ENDPOINT {
  SINGLE_AUDIO = "/upload/audio",
}
