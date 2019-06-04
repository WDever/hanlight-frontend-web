import { AxiosResponse } from 'axios';
import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ExistParam,
  ExistResponse,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GetUser,
  ID_EXIST,
  ID_EXIST_FAILURE,
  ID_EXIST_SUCCESS_FALSE,
  ID_EXIST_SUCCESS_TRUE,
  ID_RECOVERY,
  ID_RECOVERY_FAILURE,
  ID_RECOVERY_SUCCESS,
  IdExist,
  IdRecovery,
  Login,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LoginParam,
  PW_RECOVERY,
  PW_RECOVERY_FAILURE,
  PW_RECOVERY_SUCCESS,
  PwRecovery,
  PwRecoveryParam,
  Register,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RegisterParam,
  SIGN_KEY_EXIST,
  SIGN_KEY_EXIST_FAILURE,
  SIGN_KEY_EXIST_SUCCESS_FALSE,
  SIGN_KEY_EXIST_SUCCESS_TRUE,
  SignKeyExist,
  TP_EXIST,
  TP_EXIST_FAILURE,
  TP_EXIST_SUCCESS_FALSE,
  TP_EXIST_SUCCESS_TRUE,
  TpExist,
  VERIFY_PHONE,
  VERIFY_PHONE_FAILURE,
  VERIFY_PHONE_SUCCESS,
  VerifyPhone,
  VerifyPhoneParam,
} from '../action';

const loginApi = (data: LoginParam) =>
  instance
    .post('http://54.180.114.156:3000/api/user/login', {
      id: data.id,
      password: data.password,
    })
    .then(res => res.data);

function* loginApiSaga(action: Login) {
  if (action.type) {
    try {
      const response = yield call(loginApi, action.payload);
      console.log(response);
      yield put({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: LOGIN_FAILURE, payload: e.response });
    }
  }
}

const idRecoveryApi = ({ code }: { code: string }) =>
  instance
    .post('http://54.180.114.156:3000/api/user/recovery/id', {
      code,
    })
    .then(res => res.data);

function* idRecoverySaga(action: IdRecovery) {
  if (action.type) {
    try {
      const response = yield call(idRecoveryApi, action.payload);
      console.log(response);
      yield put({ type: ID_RECOVERY_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: ID_RECOVERY_FAILURE, payload: e.response });
    }
  }
}

const pwRecoveryApi = (data: PwRecoveryParam) =>
  instance
    .post('http://54.180.114.156:3000/api/user/recovery/password', {
      code: data.code,
      id: data.id,
      password: data.password,
    })
    .then(res => res.data);

function* pwRecoverySaga(action: PwRecovery) {
  if (action.type) {
    try {
      const response = yield call(pwRecoveryApi, action.payload);
      console.log(response);
      yield put({ type: PW_RECOVERY_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e.response);
      yield put({ type: PW_RECOVERY_FAILURE, payload: e.response });
    }
  }
}

const existApi = (value: ExistParam) =>
  instance
    .get('/api/user/exist', {
      params: {
        key: value.key,
        value: value.value,
      },
    })
    .then((res: AxiosResponse<ExistResponse>) => res.data);

function* idExistSaga(action: IdExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, {
        key: 'id',
        value: action.payload.id,
      });
      console.log(response);
      yield put({
        type: response.data.exist
          ? ID_EXIST_SUCCESS_TRUE
          : ID_EXIST_SUCCESS_FALSE,
        payload: action.payload,
      });
    } catch (e) {
      console.log(e.response);
      yield put({ type: ID_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* tpExistSaga(action: TpExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, {
        key: 'tp',
        value: action.payload.tp,
      });
      console.log(response);
      yield put({
        type: response.data.exist
          ? TP_EXIST_SUCCESS_TRUE
          : TP_EXIST_SUCCESS_FALSE,
        payload: action.payload,
      });
    } catch (e) {
      console.log(e.response);
      yield put({ type: TP_EXIST_FAILURE, payload: action.payload });
    }
  }
}

function* signKeyExistSaga(action: SignKeyExist) {
  if (action.type) {
    try {
      const response = yield call(existApi, {
        key: 'signKey',
        value: action.payload.signKey,
      });
      console.log(response);
      yield put({
        type: response.data.exist
          ? SIGN_KEY_EXIST_SUCCESS_TRUE
          : SIGN_KEY_EXIST_SUCCESS_FALSE,
        payload: action.payload,
      });
    } catch (e) {
      console.log(e.response);
      yield put({ type: SIGN_KEY_EXIST_FAILURE, payload: action.payload });
    }
  }
}

const verifyPhoneApi = (data: VerifyPhoneParam) =>
  instance
    .post('http://54.180.114.156:3000/api/user/phone', {
      code: data.code,
      signKey: data.signKey,
    })
    .then(res => res.data);

function* verifyPhoneApiSaga(action: VerifyPhone) {
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

const registerApi = (data: RegisterParam) =>
  instance
    .post('http://54.180.114.156:3000/api/user/register', {
      id: data.id,
      password: data.password,
      signKey: data.signKey,
    })
    .then(res => res.data);

function* registerApiSaga(action: Register) {
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

const getUserApi = (data: string) =>
  instance
    .get('http://54.180.114.156:3000/api/user', {
      headers: {
        access_token: data,
      },
    })
    .then((res: AxiosResponse) => res.data);
function* getUserApiSaga(action: GetUser) {
  if (action.type) {
    try {
      const response = yield call(getUserApi, action.payload);
      console.log(response);
      yield put({
        type: GET_USER_SUCCESS,
        payload: {
          user: response.data.user,
          token: action.payload,
        },
      });
    } catch (e) {
      console.log(e.response);
      yield put({ type: GET_USER_FAILURE, paylaod: e.response });
    }
  }
}

function* userSaga() {
  yield takeEvery(ID_RECOVERY, idRecoverySaga);
  yield takeEvery(PW_RECOVERY, pwRecoverySaga);
  yield takeEvery(LOGIN, loginApiSaga);
  yield takeEvery(ID_EXIST, idExistSaga);
  yield takeEvery(TP_EXIST, tpExistSaga);
  yield takeEvery(SIGN_KEY_EXIST, signKeyExistSaga);
  yield takeEvery(REGISTER, registerApiSaga);
  yield takeEvery(VERIFY_PHONE, verifyPhoneApiSaga);
  yield takeEvery(GET_USER, getUserApiSaga);
}

export { userSaga };
