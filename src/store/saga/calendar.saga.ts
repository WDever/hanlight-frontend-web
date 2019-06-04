import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CALENDAR,
  Calendar,
  CALENDAR_FAILURE,
  CALENDAR_RECENT,
  CALENDAR_RECENT_FAILURE,
  CALENDAR_RECENT_SUCCESS,
  CALENDAR_SUCCESS,
  CalendarParams,
  CalendarRecent,
} from '../action';

const calendarApi = (data: CalendarParams) =>
  instance
    .get('http://54.180.114.156:3000/api/calendar', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        month: data.month,
        year: data.year,
      },
    })
    .then(res => res.data);

const calendarRecentApi = (data: string | null) =>
  instance
    .get('http://54.180.114.156:3000/api/calendar/recent', {
      headers: {
        access_token: data,
      },
    })
    .then(res => res.data);

function* calendarApiSaga(action: Calendar) {
  if (action.type) {
    try {
      const response = yield call(calendarApi, action.payload);
      console.log(response);
      yield put({ type: CALENDAR_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: CALENDAR_FAILURE, payload: e.response });
    }
  }
}

function* calendarRecentApiSaga(action: CalendarRecent) {
  if (action.type) {
    try {
      const response = yield call(calendarRecentApi, action.payload);
      console.log(response);
      yield put({ type: CALENDAR_RECENT_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: CALENDAR_RECENT_FAILURE, payload: e.response });
    }
  }
}

export function* calendarSaga() {
  yield takeEvery(CALENDAR, calendarApiSaga);
  yield takeEvery(CALENDAR_RECENT, calendarRecentApiSaga);
}
