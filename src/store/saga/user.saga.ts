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

function* loginApiSaga(action: Login) {
  if (action.type) {
    try {
      const response = yield call(loginApi, action.payload);
      console.log(response);
      localStorage.setItem('loginStatus', 'sucess');
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('type', response.data.user.type);
      localStorage.setItem('admin', response.data.user.admin);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('major', response.data.user.major);
      localStorage.setItem('grade', response.data.user.grade);
      localStorage.setItem('classNum', response.data.user.classNum);
      localStorage.setItem('studentNum', response.data.user.studentNum);
      yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: LOGIN_FAILURE, payload: e.response });
    }
  }
}

function* userSaga() {
  yield takeEvery(LOGIN, loginApiSaga);
}

export { userSaga };
