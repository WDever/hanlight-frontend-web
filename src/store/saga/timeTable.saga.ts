import { put, call, takeEvery } from 'redux-saga/effects';
import { instance } from 'lib/baseUrl';
import {
  TIMETABLE,
  TIMETABLE_FAILURE,
  TIMETABLE_SUCCESS,
  Timetable,
} from '../action';

const timetableApi = (data: string | null) => instance
  .get('/api/timetable', {
    headers: {
      access_token: data,
    },
  })
  .then(res => res.data);

function* timetableApiSaga(action: Timetable) {
  if (action.type) {
    try {
      const response = yield call(timetableApi, action.payload);
      console.log(response);
      yield put({ type: TIMETABLE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: TIMETABLE_FAILURE, payload: e.response });
    }
  }
}

export function* timeTableSaga() {
  yield takeEvery(TIMETABLE, timetableApiSaga);
}
