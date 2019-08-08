import axios from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://test-backend.hanlight.kr/'
      : 'https://api.hanlight.kr/',
});
