import { yieldExpression } from '@babel/types';
import { hanseithonInstance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_TEAM_FAILURE,
  GET_TEAM_SUCCESS,
  GetTeam,
  PUT_TEAM_FAILURE,
  PUT_TEAM_SUCCESS,
  PutTeam,
  PutTeamParams,
  SET_ERROR,
} from 'store';
import {
  GET_TEAM,
  GET_TEAM_MATCH,
  GET_TEAM_MATCH_FAILURE,
  GET_TEAM_MATCH_SUCCESS,
  GetTeamMatchParams,
  GetTeamParams,
  POST_TEAM,
  POST_TEAM_FAILURE,
  POST_TEAM_MATCH,
  POST_TEAM_MATCH_FAILURE,
  POST_TEAM_MATCH_SUCCESS,
  POST_TEAM_SUCCESS,
  PostTeam,
  PostTeamMatch,
  PostTeamMatchParams,
  PostTeamParams,
  PUT_TEAM,
} from 'store/action';
import { action } from 'typesafe-actions';

const putTeamApi = (payload: PutTeamParams) =>
  hanseithonInstance
    .put(
      '/team',
      {
        team_pk: payload.team_pk,
        position: payload.posiotion,
        code: payload.code,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res);

function* putTeamApiSaga(action: PutTeam) {
  if (action.type) {
    try {
      const response = yield call(putTeamApi, action.payload);

      yield put({ type: PUT_TEAM_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PUT_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getTeamMatchApi = (payload: GetTeamMatchParams) =>
  hanseithonInstance
    .get('/team/match', {
      headers: {
        authorization: payload.accessToken,
      },
      params: {
        category: payload.category,
      },
    })
    .then(res => res.data);
function* getTeamMatchApiSaga(action: PostTeamMatch) {
  if (action.type) {
    try {
      const response = yield call(getTeamMatchApi, action.payload);

      yield put({ type: GET_TEAM_MATCH_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_TEAM_MATCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postMatchTeamApi = (payload: PostTeamMatchParams) =>
  hanseithonInstance
    .post(
      '/team/match',
      {
        category: payload.category,
        position: payload.position,
        introduction: payload.introduction,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postMatchTeamApiSaga(action: PostTeamMatch) {
  if (action.type) {
    try {
      const response = yield call(postMatchTeamApi, action.payload);

      yield put({ type: POST_TEAM_MATCH_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_TEAM_MATCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postTeamApi = (payload: PostTeamParams) =>
  hanseithonInstance
    .post(
      '/team',
      {
        team_name: payload.teamName,
        user_position: payload.userPosiotion,
        category: payload.category,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postTeamApiSaga(action: PostTeam) {
  if (action.type) {
    try {
      const response = yield call(postTeamApi, action.payload);

      yield put({ type: POST_TEAM_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getTeamApi = (payload: GetTeamParams) =>
  hanseithonInstance
    .get('/team', {
      headers: {
        authorization: payload.accessToken,
      },
      params: {
        category: payload.category,
      },
    })
    .then(res => res.data);

function* getTeamApiSaga(action: GetTeam) {
  if (action.type) {
    try {
      const response = yield call(getTeamApi, action.payload);

      yield put({ type: GET_TEAM_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* hanseithonSaga() {
  yield takeEvery(PUT_TEAM, putTeamApiSaga);
  yield takeEvery(GET_TEAM, getTeamApiSaga);
  yield takeEvery(GET_TEAM_MATCH, getTeamMatchApiSaga);
  yield takeEvery(POST_TEAM_MATCH, postMatchTeamApiSaga);
  yield takeEvery(POST_TEAM, postTeamApiSaga);
}

export { hanseithonSaga };
