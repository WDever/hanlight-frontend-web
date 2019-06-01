import { all } from 'redux-saga/effects';
import { registerSaga } from './register.saga';
import { userSaga } from './user.saga';
import { existSagas } from './exist.saga';
import { calendarSaga } from './calendar.saga';
import { mealSaga } from './meal.saga';
import { noticeSaga } from './notice.saga';
import { timeTableSaga } from './timeTable.saga';

function* rootSaga() {
  yield all([
    registerSaga(),
    userSaga(),
    existSagas(),
    calendarSaga(),
    mealSaga(),
    noticeSaga(),
    timeTableSaga(),
  ]);
}

export { rootSaga };
