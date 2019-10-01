import axios from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.REACT_APP_CUSTOM_NODE_ENV === 'development'
      ? 'https://test-backend.hanlight.kr/'
      : 'https://api.hanlight.kr/',
});

export const payInstance = axios.create({
  baseURL:
    process.env.REACT_APP_CUSTOM_NODE_ENV === 'development'
      ? 'http://13.125.251.203/'
      : 'https://pay.hanlight.kr/',
});
