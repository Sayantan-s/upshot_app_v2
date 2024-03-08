declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      ORIGIN: string;
      CLIENT_ORIGIN: string;
      SESSION_SECRET: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      API_KEY: string;
      FREE_ACCESS_EMAIL: string;
      JWT_SECRET: string;
      OPENAI_API_KEY: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_SECRET_KEY: string;
      AAI_API_KEY: string;
      SERVERLESS_FN: string;
      GEN_POSTS_DEV_TEST_API_KEY: string;
      SERVERLESS_API_KEY: string;
    }

    interface Global {}
  }
}

export {};
