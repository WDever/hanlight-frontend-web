import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_TIMETABLE,
  GET_TIMETABLE_FAILURE,
  GET_TIMETABLE_SUCCESS,
  GetTimetable,
  SET_ERROR,
} from '../action';
import { ErrorSaga } from './error.saga';

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

      yield put({ type: GET_TIMETABLE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({
        type: SET_ERROR,
        name: GET_TIMETABLE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

export function* timeTableSaga() {
  yield takeEvery(GET_TIMETABLE, getTimetableApiSaga);
}
