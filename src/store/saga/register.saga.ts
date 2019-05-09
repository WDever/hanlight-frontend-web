import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterParams,
  Register,
  VerifyPhoneParams,
  VerifyPhone,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_FAILURE,
  VERIFY_PHONE,
} from '../action';

const verifyPhoneApi = (data: VerifyPhoneParams) => axios
  .post('http://54.180.114.156:3000/api/user/phone', {
    code: data.code,
    signKey: data.signKey,
  })
  .then(res => res.data);

function* verifyPhoneSaga(action: VerifyPhone) {
  if (action.type) {
    try {
      const response = yield call(verifyPhoneApi, action.payload);
      console.log(response);
      yield put({ type: VERIFY_PHONE_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: VERIFY_PHONE_FAILURE, payload: e.response });
    }
  }
}

const registerApi = (data: RegisterParams) => axios
  .post('http://54.180.114.156:3000/api/user/register', {
    id: data.id,
    password: data.password,
    signKey: data.signKey,
  })
  .then(res => res.data);

function* joinSaga(action: Register) {
  if (action.type) {
    try {
      const response = yield call(registerApi, action.payload);
      console.log(response);
      yield put({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: REGISTER_FAILURE, paylaod: e.response });
    }
  }
}

function* registerSaga() {
  yield takeEvery(REGISTER, joinSaga);
  yield takeEvery(VERIFY_PHONE, verifyPhoneSaga);
}

export { registerSaga };
