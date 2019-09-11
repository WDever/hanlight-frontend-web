import { call, put, takeEvery } from 'redux-saga/effects';
import { GetMusic, hanlightMusicActions } from 'store';
import {
  GetMusicSearch,
  HanlightMusicTypes,
  PostMusic,
  SET_ERROR,
} from 'store/action';
import {
  getMusicRequest,
  getMusicSearchRequest,
  postMusicRequset,
} from './hm.request';

function* getMusicSaga(action: GetMusic) {
  if (action.type) {
    try {
      const response = yield call(getMusicRequest, action.payload);

      yield put({
        type: HanlightMusicTypes.GET_MUSIC_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: HanlightMusicTypes.GET_MUSIC_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postMusicSaga(action: PostMusic) {
  if (action.type) {
    try {
      const response = yield call(postMusicRequset, action.payload);

      yield put({
        type: HanlightMusicTypes.POST_MUSIC_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: SET_ERROR,
        name: HanlightMusicTypes.POST_MUSIC_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getMusicSearch(action: GetMusicSearch) {
  if (action.type) {
    try {
      const response = yield call(getMusicSearchRequest, action.payload);

      yield put({
        type: HanlightMusicTypes.GET_MUSIC_SEARCH_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: HanlightMusicTypes.GET_MUSIC_SEARCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

export function* hanlightMusicSaga() {
  yield takeEvery(HanlightMusicTypes.GET_MUSIC, getMusicSaga);
  yield takeEvery(HanlightMusicTypes.POST_MUSIC, postMusicSaga);
  yield takeEvery(HanlightMusicTypes.GET_MUSIC_SEARCH, getMusicSearch);
}
