import axios from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://test.hanlight.kr/'
      : 'https://api.hanlight.kr/',
});
