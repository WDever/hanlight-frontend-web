import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  NOTICE,
  Notice,
  NOTICE_FAILURE,
  NOTICE_POST,
  NOTICE_POST_FAILURE,
  NOTICE_POST_SUCCESS,
  NOTICE_SUCCESS,
  NoticeParams,
  NoticePost,
  NoticePostParams,
} from '../action';

const noticeApi = (data: NoticeParams) =>
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

function* noticeApiSaga(action: Notice) {
  if (action.type) {
    try {
      const response = yield call(noticeApi, action.payload);
      console.log(response);
      yield put({ type: NOTICE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: NOTICE_FAILURE, payload: e.response });
    }
  }
}

const noticePostApi = (data: NoticePostParams) =>
  instance
    .get('/api/notice', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        type: 'post',
        post_pk: data.postPk,
      },
    })
    .then(res => res.data);

function* noticePostApiSaga(action: NoticePost) {
  if (action.type) {
    try {
      const response = yield call(noticePostApi, action.payload);
      console.log(response);
      yield put({ type: NOTICE_POST_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: NOTICE_POST_FAILURE, payload: e.response });
    }
  }
}

export function* noticeSaga() {
  yield takeEvery(NOTICE, noticeApiSaga);
  yield takeEvery(NOTICE_POST, noticePostApiSaga);
}
