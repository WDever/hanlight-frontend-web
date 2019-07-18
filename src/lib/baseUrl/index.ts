import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://test.hanlight.kr/',
});

export const hanseithonInstance = axios.create({
  baseURL: 'https://hanseithon.hanlight.kr/',
});
