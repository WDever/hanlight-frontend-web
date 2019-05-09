import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  Login,
  LoginParams,
  LoginResType,
} from '../action';

const loginApi = (data: LoginParams) => axios
  .post('http://54.180.114.156:3000/api/user/login', {
    id: data.id,
    password: data.password,
  })
  .then(res => res.data);

function* loginSaga(action: Login) {
  if (action.type) {
    try {
      const response = yield call(loginApi, action.payload);
      console.log(response);
      yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: LOGIN_FAILURE, payload: e.response });
    }
  }
}

function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
}

export { userSaga };
