import { hanlightMusicInstance } from 'lib/baseUrl';
import { GetMusicPayload, PostMusicPayload } from 'store/action';

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
