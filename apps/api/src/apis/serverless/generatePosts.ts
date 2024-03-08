import { Build_In_Public } from '@prisma/client';
import { serverless } from '.';

export const generatePosts = async (
  data: Pick<Build_In_Public, 'productName' | 'productMoto'>
) => {
  const res = await serverless.post('/posts/generate', data);
  return res.data;
};
