import { combineReducers } from 'redux';
import { registerReducer } from './register.reducer';
import { userReducer } from './user.reducer';
import { existReducer } from './exist.reducer';

const reducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  exist: existReducer,
});

export { reducer };
