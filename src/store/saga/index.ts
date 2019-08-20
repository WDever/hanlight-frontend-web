import { all } from 'redux-saga/effects';
import { boardSaga } from './board.saga';
import { calendarSaga } from './calendar.saga';
import { errorSaga } from './error.saga';
import { hanlightMusicSaga } from './hanlight-music';
import { mealSaga } from './meal.saga';
import { noticeSaga } from './notice.saga';
import { timeTableSaga } from './timeTable.saga';
import { userSaga } from './user.saga';

function* rootSaga() {
  yield all([
    userSaga(),
    calendarSaga(),
    mealSaga(),
    noticeSaga(),
    timeTableSaga(),
    boardSaga(),
    errorSaga(),
    hanlightMusicSaga(),
  ]);
}

export { rootSaga };
