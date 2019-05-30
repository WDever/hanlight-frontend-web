import { put, call, takeEvery } from 'redux-saga/effects';
import { instance } from 'lib/baseUrl';
import {
  TIMETABLE,
  TIMETABLE_SUCCESS,
  TIMETABLE_FAILURE,
  CALENDAR,
  CALENDAR_SUCCESS,
  CALENDAR_FAILURE,
  NOTICE,
  NOTICE_SUCCESS,
  NOTICE_FAILURE,
  NOTICE_POST,
  NOTICE_POST_SUCCESS,
  NOTICE_POST_FAILURE,
  MEAL,
  MEAL_SUCCESS,
  MEAL_FAILURE,
  MEAL_ORDER,
  MEAL_ORDER_SUCCESS,
  MEAL_ORDER_FAILURE,
  Timetable,
  Calendar,
  CalendarParams,
  Notice,
  NoticeParams,
  NoticePost,
  NoticePostParams,
  Meal,
  MealParams,
  MealOrder,
  CalendarRecent,
  CALENDAR_RECENT,
  CALENDAR_RECENT_SUCCESS,
  CALENDAR_RECENT_FAILURE,
} from '../action';

const timetableApi = (data: string | null) => instance
  .get('/api/timetable', {
    headers: {
      // access_token: data,
    },
  })
  .then(res => res.data);

function* timetableApiSaga(action: Timetable) {
  if (action.type) {
    try {
      const response = yield call(timetableApi, action.payload);
      console.log(response);
      yield put({ type: TIMETABLE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: TIMETABLE_FAILURE, payload: e.response });
    }
  }
}

const calendarApi = (data: CalendarParams) => instance
  .get(`http://54.180.114.156:3000/api/calendar/${data.recent ? 'recent' : ''}`, {
    headers: {
      // access_token: data.access_token,
    },
    params: {
      month: data.month,
      year: data.year,
    },
  })
  .then(res => res.data);

const calendarRecentApi = (data: string | null) => instance
  .get('http://54.180.114.156:3000/api/calendar/recent', {
    headers: {
      // access_token: data,
    },
  })
  .then(res => res.data);

function* calendarApiSaga(action: Calendar) {
  if (action.type) {
    try {
      const response = yield call(calendarApi, action.payload);
      console.log(response);
      yield put({ type: CALENDAR_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: CALENDAR_FAILURE, payload: e.response });
    }
  }
}

function* calendarRecentApiSaga(action: CalendarRecent) {
  if (action.type) {
    try {
      const response = yield call(calendarRecentApi, action.payload);
      console.log(response);
      yield put({ type: CALENDAR_RECENT_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: CALENDAR_RECENT_FAILURE, payload: e.response });
    }
  }
}

const noticeApi = (data: NoticeParams) => instance
  .get('/api/notice', {
    headers: {
      // access_token: data.access_token,
    },
    params: {
      type: 'list',
      page: data.page,
      title: data.title,
    },
  })
  .then(res => res.data);

function* noticeApiSaga(action: Notice) {
  if (action.type) {
    try {
      const response = yield call(noticeApi, action.payload);
      console.log(response);
      yield put({ type: NOTICE_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: NOTICE_FAILURE, payload: e.response });
    }
  }
}

const noticePostApi = (data: NoticePostParams) => instance
  .get('/api/notice', {
    headers: {
      // access_token: data.access_token,
    },
    params: {
      type: 'post',
      post_pk: data.postPk,
    },
  })
  .then(res => res.data);

function* noticePostApiSaga(action: NoticePost) {
  if (action.type) {
    try {
      const response = yield call(noticePostApi, action.payload);
      console.log(response);
      yield put({ type: NOTICE_POST_SUCCESS, payload: response });
    } catch (e) {
      console.log(e.response);
      yield put({ type: NOTICE_POST_FAILURE, payload: e.response });
    }
  }
}

const mealApi = (data: MealParams) => instance
  .get('/api/meal', {
    headers: {
      // access_token: data.access_token,
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
      // access_token: data,
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

function* utilsSaga() {
  yield takeEvery(TIMETABLE, timetableApiSaga);
  yield takeEvery(CALENDAR, calendarApiSaga);
  yield takeEvery(CALENDAR_RECENT, calendarRecentApiSaga);
  yield takeEvery(NOTICE, noticeApiSaga);
  yield takeEvery(NOTICE_POST, noticePostApiSaga);
  yield takeEvery(MEAL, mealApiSaga);
  yield takeEvery(MEAL_ORDER, mealOrderApiSaga);
}

export { utilsSaga };
