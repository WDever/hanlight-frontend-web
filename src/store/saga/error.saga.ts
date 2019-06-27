import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { SET_ERROR } from 'store/action';
import { ErrorResponse } from 'store/model';

interface FailureAction extends Action {
  name: string;
}

export function* ErrorSaga(action: FailureAction) {
  yield put({ type: action.name });
}

export function* errorSaga() {
  yield takeEvery(SET_ERROR, ErrorSaga);
}
