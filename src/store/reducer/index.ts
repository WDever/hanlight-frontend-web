import { combineReducers } from 'redux';
import { registerReducer } from './register.reducer';
import { userReducer } from './user.reducer';

const reducer = combineReducers({
  register: registerReducer,
  user: userReducer,
});

export { reducer };
