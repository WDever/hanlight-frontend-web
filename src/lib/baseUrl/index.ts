import axios from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.REACT_APP_CUSTOM_NODE_ENV === 'development'
      ? // ? 'https://test-backend.hanlight.kr/'
        'http://localhost:3030/'
      : 'https://api.hanlight.kr/',
});
