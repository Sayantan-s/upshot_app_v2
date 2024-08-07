/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_SERVER_ORIGIN: string;
  readonly VITE_API_KEY: string;
  readonly VITE_FREE_ACCESS_EMAIL: string;
  readonly VITE_UPSTASH_REDIS_REST_URL: string;
  readonly VITE_UPSTASH_REDIS_REST_TOKEN: string;
  readonly VITE_WS_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module Api {
  interface SuccessResponse<TData> {
    requestId: string;
    statusCode: number;
    success: true;
    data: TData;
  }
  interface SuccessResponseNoPayload {
    requestId: string;
    statusCode: number;
    success: true;
  }
}
