import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { instance } from 'lib/baseUrl';
import {
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
  ExistResType,
  IdExist,
  TpExist,
  SignKeyExist,
} from '../action';

const existApi = (value: ExistParamsType) => instance
  .get('/api/user/exist', {
    params: {
      key: value.key,
      value: value.value,
    },
  })
  .then((res: AxiosResponse<ExistResType>) => res.data);

function* idExistSaga(action: IdExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, { key: 'id', value: action.payload });
      console.log(response);
      if (response.data.exist) {
        yield put({ type: ID_EXIST_SUCCESS, payload: action.payload });
      } else {
        yield put({ type: ID_EXIST_FAILURE, payload: action.payload });
      }
    } catch (e) {
      console.log(e.response);
      yield put({ type: ID_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* tpExistSaga(action: TpExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, { key: 'tp', value: action.payload });
      console.log(response);
      if (response.data.exist) {
        yield put({ type: TP_EXIST_SUCCESS, payload: action.payload });
      } else {
        yield put({ type: TP_EXIST_FAILURE, payload: action.payload });
      }
    } catch (e) {
      console.log(e.response);
      yield put({ type: TP_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* signKeyExistSaga(action: SignKeyExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, { key: 'signKey', value: action.payload });
      console.log(response);
      if (response.data.exist) {
        yield put({ type: SIGN_KEY_EXIST_SUCCESS, payload: action.payload });
      } else {
        yield put({ type: SIGN_KEY_EXIST_FAILURE, payload: action.payload });
      }
    } catch (e) {
      console.log(e.response);
      yield put({ type: SIGN_KEY_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* existSagas() {
  yield takeEvery(ID_EXIST, idExistSaga);
  yield takeEvery(TP_EXIST, tpExistSaga);
  yield takeEvery(SIGN_KEY_EXIST, signKeyExistSaga);
}

export { existSagas };
