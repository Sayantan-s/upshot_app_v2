import {
  GEN_POSTS_DEV_TEST_API_KEY,
  NODE_ENV,
  SERVERLESS_API_KEY,
} from '@api/config';
import { Build_In_Public } from '@prisma/client';
import { serverless } from '.';

export const generatePosts = async (
  data: Pick<Build_In_Public, 'productName' | 'productMoto'>
) => {
  const isDevelopment = NODE_ENV === 'development';
  const res = await serverless.post('/posts/generate', data, {
    headers: {
      'x-api-key': SERVERLESS_API_KEY,
      ...(isDevelopment ? { 'x-test-key': GEN_POSTS_DEV_TEST_API_KEY } : {}),
    },
  });
  return res.data;
};
