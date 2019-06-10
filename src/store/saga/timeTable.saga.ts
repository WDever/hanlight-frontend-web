import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_TIMETABLE,
  GET_TIMETABLE_FAILURE,
  GET_TIMETABLE_SUCCESS,
  GetTimetable,
} from '../action';

const getTimetableApi = (data: string | null) =>
  instance
    .get('/api/timetable', {
      headers: {
        access_token: data,
      },
    })
    .then(res => res.data);

function* getTimetableApiSaga(action: GetTimetable) {
  if (action.type) {
    try {
      const response = yield call(getTimetableApi, action.payload);
      console.log(response);
      yield put({ type: GET_TIMETABLE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: GET_TIMETABLE_FAILURE, payload: e.response });
    }
  }
}

export function* timeTableSaga() {
  yield takeEvery(GET_TIMETABLE, getTimetableApiSaga);
}
