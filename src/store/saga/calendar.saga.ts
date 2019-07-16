import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_CALENDAR,
  GET_CALENDAR_FAILURE,
  GET_CALENDAR_RECENT,
  GET_CALENDAR_RECENT_FAILURE,
  GET_CALENDAR_RECENT_SUCCESS,
  GET_CALENDAR_SUCCESS,
  GetCalendar,
  GetCalendarParams,
  GetCalendarRecent,
  SET_ERROR,
} from '../action';

const getCalendarApi = (data: GetCalendarParams) =>
  instance
    .get('/api/calendar', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        month: data.month,
        year: data.year,
      },
    })
    .then(res => res.data);

const getCalendarRecentApi = (data: string | null) =>
  instance
    .get('/api/calendar/recent', {
      headers: {
        access_token: data,
      },
    })
    .then(res => res.data);

function* getCalendarApiSaga(action: GetCalendar) {
  if (action.type) {
    try {
      const response = yield call(getCalendarApi, action.payload);
      yield put({ type: GET_CALENDAR_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({
        type: SET_ERROR,
        name: GET_CALENDAR_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getCalendarRecentApiSaga(action: GetCalendarRecent) {
  if (action.type) {
    try {
      const response = yield call(getCalendarRecentApi, action.payload);
      yield put({ type: GET_CALENDAR_RECENT_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({
        type: SET_ERROR,
        name: GET_CALENDAR_RECENT_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

export function* calendarSaga() {
  yield takeEvery(GET_CALENDAR, getCalendarApiSaga);
  yield takeEvery(GET_CALENDAR_RECENT, getCalendarRecentApiSaga);
}
