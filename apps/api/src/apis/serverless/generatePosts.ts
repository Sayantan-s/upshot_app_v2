import {
  GEN_POSTS_DEV_TEST_API_KEY,
  NODE_ENV,
  SERVERLESS_API_KEY,
} from '@api/config';
import { IGenaiPost } from '@api/integrations/queues/genai/type';
import { Product } from '@prisma/client';
import { serverless } from '.';

export const generatePosts = async (
  data: Pick<Product, 'productName' | 'productMoto'>
) => {
  const isLocal = NODE_ENV === 'local';
  const res = await serverless.post<IGenaiPost[]>('/posts/generate', data, {
    headers: {
      'x-api-key': SERVERLESS_API_KEY,
      ...(isLocal ? { 'x-test-key': GEN_POSTS_DEV_TEST_API_KEY } : {}),
    },
  });
  return res.data;
};
