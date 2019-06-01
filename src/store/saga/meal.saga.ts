import { call, put, takeEvery } from 'redux-saga/effects';
import { instance } from 'lib/baseUrl';
import {
  MEAL,
  MEAL_SUCCESS,
  MEAL_FAILURE,
  MEAL_ORDER,
  MEAL_ORDER_SUCCESS,
  MEAL_ORDER_FAILURE,
  Meal,
  MealOrder,
  MealParams,
} from '../action';

const mealApi = (data: MealParams) => instance
  .get('/api/meal', {
    headers: {
      access_token: data.access_token,
    },
    params: {
      sort: data.sort,
    },
  })
  .then(res => res.data);

function* mealApiSaga(action: Meal) {
  if (action.type) {
    try {
      const response = yield call(mealApi, action.payload);
      console.log(response);
      yield put({ type: MEAL_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: MEAL_FAILURE, payload: e.response });
    }
  }
}

const mealOrderApi = (data: string) => instance
  .get('/api/meal/order', {
    headers: {
      access_token: data,
    },
  })
  .then(res => res);

function* mealOrderApiSaga(action: MealOrder) {
  if (action.type) {
    try {
      const response = yield call(mealOrderApi, action.payload);
      console.log(response);
      yield put({ type: MEAL_ORDER_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.reponse);
      yield put({ type: MEAL_ORDER_FAILURE, payload: e.response });
    }
  }
}

export function* mealSaga() {
  yield takeEvery(MEAL, mealApiSaga);
  yield takeEvery(MEAL_ORDER, mealOrderApiSaga);
}
