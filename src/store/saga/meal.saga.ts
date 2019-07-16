import { instance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_MEAL,
  GET_MEAL_MONTH_FAILURE,
  GET_MEAL_MONTH_SUCCESS,
  GET_MEAL_ORDER,
  GET_MEAL_ORDER_FAILURE,
  GET_MEAL_ORDER_SUCCESS,
  GET_MEAL_WEEK_FAILURE,
  GET_MEAL_WEEK_SUCCESS,
  GetMeal,
  GetMealOrder,
  GetMealOrderParams,
  GetMealParams,
  SET_ERROR,
} from '../action';

const getMealApi = (data: GetMealParams) =>
  instance
    .get('/api/meal', {
      headers: {
        access_token: data.accessToken,
      },
      params: {
        sort: data.sort,
        month: data.month,
      },
    })
    .then(res => res.data);

function* getMealApiSaga(action: GetMeal) {
  if (action.type) {
    try {
      const response = yield call(getMealApi, action.payload);

      if (action.payload.sort === 'week') {
        yield put({ type: GET_MEAL_WEEK_SUCCESS, payload: response });
      } else {
        yield put({ type: GET_MEAL_MONTH_SUCCESS, payload: response });
      }
    } catch (e) {
      console.log(e.response);
      yield put({
        type: SET_ERROR,
        name:
          action.payload.sort === 'week'
            ? GET_MEAL_WEEK_FAILURE
            : GET_MEAL_MONTH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getMealOrderApi = (data: GetMealOrderParams) =>
  instance
    .get('/api/meal/order', {
      headers: {
        access_token: data.accessToken,
      },
    })
    .then(res => res.data);

function* getMealOrderApiSaga(action: GetMealOrder) {
  if (action.type) {
    try {
      const response = yield call(getMealOrderApi, action.payload);
      yield put({ type: GET_MEAL_ORDER_SUCCESS, payload: response });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_MEAL_ORDER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

export function* mealSaga() {
  yield takeEvery(GET_MEAL, getMealApiSaga);
  yield takeEvery(GET_MEAL_ORDER, getMealOrderApiSaga);
}
