import { hanlightMusicInstance } from 'lib/baseUrl';
import {
  GetMusicPayload,
  GetMusicSearchPayload,
  PostMusicPayload,
} from 'store/action';

export const getMusicRequest = (data: GetMusicPayload) =>
  hanlightMusicInstance
    .get('/api/music/', {
      headers: {
        Authorization: data.accessToken,
      },
    })
    .then(res => res.data);

export const postMusicRequset = (data: PostMusicPayload) =>
  hanlightMusicInstance
    .post(
      '/api/music/',
      {
        title: data.title,
        album: data.album,
      },
      {
        headers: {
          Authorization: data.accessToken,
        },
      },
    )
    .then(res => res.data);

export const getMusicSearchRequest = (data: GetMusicSearchPayload) =>
  hanlightMusicInstance
    .get('/api/music/search/', {
      headers: {
        Authorization: data.accessToken,
      },
      params: {
        q: data.q,
        type: data.type,
      },
    })
    .then(res => res.data);
