import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterParams,
  Register,
  PinType,
  GetState,
  GET_STATE_SUCCESS,
  GET_STATE_FAILURE,
  VerifyPhoneParams,
  VerifyPhone,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_FAILURE,
  VERIFY_PHONE,
  GET_STATE,
} from '../action';

const getStateApi = (value: PinType) => axios
  .post('http://54.180.114.156:3000/api/verify/phone/state', {
    signKey: value,
  })
  .then(res => res.data);

function* getStateSaga(action: GetState) {
  if (action.type) {
    try {
      const response = yield call(getStateApi, action.payload);
      console.log(response);
      yield put({ type: GET_STATE_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      console.log(e);
      yield put({ type: GET_STATE_FAILURE, payload: e.response });
    }
  }
}

const verifyPhoneApi = (data: VerifyPhoneParams) => axios
  .post('http://54.180.114.156:3000/api/verify/phone', {
    code: data.code,
    state: data.state,
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
  .post('http://54.180.114.156:3000/api/verify/register', {
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
  yield takeEvery(GET_STATE, getStateSaga);
  yield takeEvery(VERIFY_PHONE, verifyPhoneSaga);
}

export { registerSaga };
