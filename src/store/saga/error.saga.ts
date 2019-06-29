import { AxiosError } from 'axios';
import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { SET_ERROR } from 'store/action';
import { ErrorResponse } from 'store/model';

interface FailureAction extends Action {
  name?: string;
  payload: { err: AxiosError<ErrorResponse>; origin: Action };
}

export function* ErrorSaga(action: FailureAction) {
  if (action.name) {
    yield put({ type: action.name, payload: action.payload });
  }
}

export function* errorSaga() {
  yield takeEvery(SET_ERROR, ErrorSaga);
}
