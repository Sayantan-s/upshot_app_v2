import { SERVERLESS_FN } from '@api/config';
import axios from 'axios';

export const serverless = axios.create({
  baseURL: SERVERLESS_FN,
  timeout: 10 * 1000,
});
