import { put, call, takeEvery } from 'redux-saga/effects';
import { instance } from 'lib/baseUrl';
import {
  CALENDAR,
  CALENDAR_SUCCESS,
  CALENDAR_FAILURE,
  CALENDAR_RECENT,
  CALENDAR_RECENT_SUCCESS,
  CALENDAR_RECENT_FAILURE,
  Calendar,
  CalendarRecent,
  CalendarParams,
} from '../action';

const calendarApi = (data: CalendarParams) => instance
  .get('http://54.180.114.156:3000/api/calendar', {
    headers: {
      access_token: data.access_token,
    },
    params: {
      month: data.month,
      year: data.year,
    },
  })
  .then(res => res.data);

const calendarRecentApi = (data: string | null) => instance
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
