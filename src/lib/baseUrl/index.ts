import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://test-backend.hanlight.kr/',
});

export const hanlightMusicInstance = axios.create({
  baseURL: 'http://52.79.48.113',
});
