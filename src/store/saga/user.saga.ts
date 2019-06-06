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
  PATCH_PASSWORD,
  PATCH_PASSWORD_FAILURE,
  PATCH_PASSWORD_SUCCESS,
  PatchPassword,
  PatchPwParam,
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
  SET_ERROR,
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
      yield put({ type: SET_ERROR, payload: e.response.data });
    }
  }
}

const pwRecoveryApi = (data: PwRecoveryParam) =>
  instance
    .post('http://54.180.114.156:3000/api/user/recovery/password', {
      code: data.code,
      id: data.id,
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
      yield put({ type: SET_ERROR, payload: e.response.data });
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
      yield put({ type: SET_ERROR, payload: e.response.data });
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
      yield put({ type: SET_ERROR, payload: e.response.data });
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
      yield put({ type: SET_ERROR, payload: e.response.data });
    }
  }
}

const patchPasswordApi = (data: PatchPwParam) =>
  instance
    .patch(
      'http://54.180.114.156:3000/api/user/password',
      {
        password: data.password,
      },
      {
        headers: {
          access_token: data.accessToken,
        },
      },
    )
    .then((res: AxiosResponse) => res.data);
function* patchPasswordApiSaga(action: PatchPassword) {
  if (action.type) {
    try {
      const response = yield call(patchPasswordApi, action.payload);
      console.log(response);
      yield put({
        type: PATCH_PASSWORD_SUCCESS,
      });
    } catch (e) {
      console.log(e.response);
      yield put({ type: PATCH_PASSWORD_FAILURE, paylaod: e.response });
      yield put({ type: SET_ERROR, payload: e.response.data });
    }
  }
}

function* userSaga() {
  yield takeEvery(ID_RECOVERY, idRecoverySaga);
  yield takeEvery(PW_RECOVERY, pwRecoverySaga);
  yield takeEvery(LOGIN, loginApiSaga);
  yield takeEvery(ID_EXIST, idExistSaga);
  yield takeEvery(REGISTER, registerApiSaga);
  yield takeEvery(VERIFY_PHONE, verifyPhoneApiSaga);
  yield takeEvery(GET_USER, getUserApiSaga);
  yield takeEvery(PATCH_PASSWORD, patchPasswordApiSaga);
}

export { userSaga };
