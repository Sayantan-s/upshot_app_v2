import axios from 'axios';

export const upshotApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}/api/v1`,
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
});
