import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://test.hanlight.kr/',
});

export const hanseithonInstance = axios.create({
  baseURL: 'http://54.180.116.217/',
});
