import { all } from 'redux-saga/effects';
import { registerSaga } from './register.saga';
import { userSaga } from './user.saga';
import { existSagas } from './exist.saga';
import { utilsSaga } from './utils.saga';

function* rootSaga() {
  yield all([registerSaga(), userSaga(), existSagas(), utilsSaga()]);
}

export { rootSaga };
