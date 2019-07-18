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
import { GET_TEAM, GetTeamParams, PUT_TEAM } from 'store/action';

const putTeamApi = (payload: PutTeamParams) =>
  hanseithonInstance
    .put(
      '/team',
      {
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
}

export { hanseithonSaga };
