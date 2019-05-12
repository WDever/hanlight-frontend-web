import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  EXIST,
  EXIST_SUCCESS,
  EXIST_FAILURE,
  ID_EXIST,
  ID_EXIST_SUCCESS,
  ID_EXIST_FAILURE,
  TP_EXIST,
  TP_EXIST_SUCCESS,
  TP_EXIST_FAILURE,
  SIGN_KEY_EXIST,
  SIGN_KEY_EXIST_SUCCESS,
  SIGN_KEY_EXIST_FAILURE,
  ExistParamsType,
  ErrorResType,
  ExistResType,
  Exist,
  IdExist,
  TpExist,
  SignKeyExist,
} from '../action';

const existApi = (value: ExistParamsType) => axios
  .get('http://54.180.114.156:3000/api/user/exist', {
    params: {
      key: value.key,
      value: value.value,
    },
  })
  .then(res => res.data);

function* existApiSaga(action: Exist) {
  if (action.type) {
    try {
      const response = yield call(existApi, action.payload);
      console.log(response);
      yield put({ type: EXIST_SUCCESS, payload: response.data });
      yield put({ type: action.payload.type, payload: response });
    } catch (e) {
      console.log(e.response);
      console.log(e);
      yield put({ type: EXIST_FAILURE, payload: e.response });
      yield put({ type: action.payload.type, payload: e.response });
    }
  }
}

function* idExistSaga(action: IdExist) {
  if (action.type) {
    if (action.payload.success) {
      yield put({ type: ID_EXIST_SUCCESS, payload: action.payload });
    } else {
      yield put({ type: ID_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* tpExistSaga(action: TpExist) {
  if (action.type) {
    if (action.payload.success) {
      yield put({ type: TP_EXIST_SUCCESS, payload: action.payload });
    } else {
      yield put({ type: TP_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* signKeyExistSaga(action: SignKeyExist) {
  if (action.type) {
    if (action.payload.success) {
      yield put({ type: SIGN_KEY_EXIST_SUCCESS, payload: action.payload });
    } else {
      yield put({ type: SIGN_KEY_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* existSagas() {
  yield takeEvery(EXIST, existApiSaga);
  yield takeEvery(ID_EXIST, idExistSaga);
  yield takeEvery(TP_EXIST, tpExistSaga);
  yield takeEvery(SIGN_KEY_EXIST, signKeyExistSaga);
}

export { existSagas };
