import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { put } from 'redux-saga/effects';
import { SET_ERROR } from 'store/action';
import { ErrorResponse } from 'store/model';

interface FailureAction extends Action {
  payload: AxiosResponse<ErrorResponse>;
}

export function* ErrorSaga(action: FailureAction) {
  yield put({ type: SET_ERROR, payload: action.payload.data });
}
