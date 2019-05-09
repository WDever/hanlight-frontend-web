import { all } from 'redux-saga/effects';
// import { phoneCheckSaga } from './phoneCheck.saga';
import { registerSaga } from './register.saga';
import { userSaga } from './user.saga';
import { existSagas } from './exist.saga';

function* rootSaga() {
  yield all([registerSaga(), userSaga(), existSagas()]);
}

export { rootSaga };
