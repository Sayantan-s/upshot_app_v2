import axios from 'axios';

export const upshotApi = axios.create({
  baseURL: '/api/v1',
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
});
