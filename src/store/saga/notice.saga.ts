import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_NOTICE_LIST,
  GET_NOTICE_LIST_FAILURE,
  GET_NOTICE_LIST_SUCCESS,
  GET_NOTICE_POST,
  GET_NOTICE_POST_FAILURE,
  GET_NOTICE_POST_SUCCESS,
  GetNoticeList,
  GetNoticeListParams,
  GetNoticePost,
  GetNoticePostParams,
  SET_ERROR,
} from '../action';

const getNoticeListApi = (data: GetNoticeListParams) =>
  instance
    .get('/api/notice', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        type: 'list',
        page: data.page,
        title: data.title,
      },
    })
    .then(res => res.data);

function* getNoticeListApiSaga(action: GetNoticeList) {
  if (action.type) {
    try {
      const response = yield call(getNoticeListApi, action.payload);
      console.log(response);
      yield put({ type: GET_NOTICE_LIST_SUCCESS, payload: response });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_NOTICE_LIST_FAILURE,
        payload: e.response.data,
      });
    }
  }
}

const getNoticePostApi = (data: GetNoticePostParams) =>
  instance
    .get('/api/notice', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        type: 'post',
        post_pk: data.post_pk,
      },
    })
    .then(res => res.data);

function* getNoticPostApiSaga(action: GetNoticePost) {
  if (action.type) {
    try {
      const response = yield call(getNoticePostApi, action.payload);
      console.log(response);
      yield put({ type: GET_NOTICE_POST_SUCCESS, payload: response });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_NOTICE_POST_FAILURE,
        payload: e.response.data,
      });
    }
  }
}

export function* noticeSaga() {
  yield takeEvery(GET_NOTICE_LIST, getNoticeListApiSaga);
  yield takeEvery(GET_NOTICE_POST, getNoticPostApiSaga);
}
