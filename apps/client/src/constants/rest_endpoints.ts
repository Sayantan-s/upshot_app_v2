/* eslint-disable @typescript-eslint/no-namespace */
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
  NAME = '/product',
}

export enum SHOT_ENDPOINT {
  NAME = '/shot',
}

export namespace SHOT_ENDPOINT {
  export function SCHEDULE_ALL(_productId: string): string {
    return `${SHOT_ENDPOINT.NAME}/schedule/${_productId}/all`;
  }

  export function SCHEDULE_ONE(_shotId: string): string {
    return `${_shotId}/schedule`;
  }

  export function GET(_shotId: string): string {
    return `${SHOT_ENDPOINT.NAME}/${_shotId}`;
  }
}

export enum MEDIA_ENDPOINT {
  SINGLE_IMAGE = '/upload/image',
}
