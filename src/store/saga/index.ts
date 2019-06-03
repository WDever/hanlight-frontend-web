import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga';
import { calendarSaga } from './calendar.saga';
import { mealSaga } from './meal.saga';
import { noticeSaga } from './notice.saga';
import { timeTableSaga } from './timeTable.saga';

function* rootSaga() {
  yield all([
    userSaga(),
    calendarSaga(),
    mealSaga(),
    noticeSaga(),
    timeTableSaga(),
  ]);
}

export { rootSaga };
