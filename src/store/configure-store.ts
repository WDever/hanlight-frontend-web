import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const configureStore = createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);

export { configureStore };
