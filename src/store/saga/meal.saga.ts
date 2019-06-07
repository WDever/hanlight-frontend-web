import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_MEAL,
  GET_MEAL_FAILURE,
  GET_MEAL_ORDER,
  GET_MEAL_ORDER_FAILURE,
  GET_MEAL_ORDER_SUCCESS,
  GET_MEAL_SUCCESS,
  GetMeal,
  GetMealOrder,
  GetMealParams,
} from '../action';

const getMealApi = (data: GetMealParams) =>
  instance
    .get('/api/meal', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        sort: data.sort,
      },
    })
    .then(res => res.data);

function* getMealApiSaga(action: GetMeal) {
  if (action.type) {
    try {
      const response = yield call(getMealApi, action.payload);
      console.log(response);
      yield put({ type: GET_MEAL_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: GET_MEAL_FAILURE, payload: e.response });
    }
  }
}

const getMealOrderApi = (data: string) =>
  instance
    .get('/api/meal/order', {
      headers: {
        access_token: data,
      },
    })
    .then(res => res);

function* getMealOrderApiSaga(action: GetMealOrder) {
  if (action.type) {
    try {
      const response = yield call(getMealOrderApi, action.payload);
      console.log(response);
      yield put({ type: GET_MEAL_ORDER_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.reponse);
      yield put({ type: GET_MEAL_ORDER_FAILURE, payload: e.response });
    }
  }
}

export function* mealSaga() {
  yield takeEvery(GET_MEAL, getMealApiSaga);
  yield takeEvery(GET_MEAL_ORDER, getMealOrderApiSaga);
}
