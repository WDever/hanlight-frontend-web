import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga';
import { utilsSaga } from './utils.saga';

function* rootSaga() {
  yield all([userSaga(), utilsSaga()]);
}

export { rootSaga };
