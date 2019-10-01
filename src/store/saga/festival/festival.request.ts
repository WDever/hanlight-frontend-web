import { instance } from 'lib/baseUrl';
import {
  GetFsTimetablePayload,
  GetLolTeamPayload,
  GetMatchPayload,
  GetSingerPayload,
  PostLolVotePayload,
  PostSingerVotePayload,
} from 'store/action';

export const getLolTeamRequest = (payload: GetLolTeamPayload) =>
  instance
    .get('/api/festival/lol/team', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getMatchRequest = (payload: GetMatchPayload) =>
  instance
    .get('/api/festival/event/match', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const getSingerRequest = (payload: GetSingerPayload) =>
  instance
    .get('/api/festival/event/singer', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);

export const postSingerVoteRequest = (payload: PostSingerVotePayload) =>
  instance
    .post(
      '/api/festival/event/singer/vote',
      {
        singer_pk: payload.singerPk,
      },
      { headers: { access_token: payload.accessToken } },
    )
    .then(res => res.data);

export const postLolVoteRequest = (payload: PostLolVotePayload) =>
  instance
    .post(
      '/api/festival/lol/vote',
      {
        team_pk: payload.teamPk,
      },
      { headers: { access_token: payload.accessToken } },
    )
    .then(res => res.data);

export const getFsTimetableRequest = (payload: GetFsTimetablePayload) =>
  instance
    .get('/api/festival/timetable', {
      headers: {
        access_token: payload.accessToken,
      },
    })
    .then(res => res.data);
