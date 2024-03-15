export enum AUTH_ENDPOINT {
  REGISTER = '/auth/register',
  LOGIN = '/auth/login',
  REFRESH = '/auth/refresh',
  LOGOUT = '/auth/logout',
  EASY = '/auth/easy',
  USER = '/auth/user',
}

export enum AI_ENDPOINT {
  GENERATE_PRODUCT_ONBOARDING = '/ai/onboarding_generation',
}

export enum PRODUCT_ENDPOINT {
  CREATE = '/product/create',
  UPDATE = '/product/update',
}

export enum MEDIA_ENDPOINT {
  SINGLE_IMAGE = '/upload/image',
}
