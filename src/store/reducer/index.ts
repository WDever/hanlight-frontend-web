import { combineReducers } from 'redux';
import { registerReducer } from './register.reducer';
import { userReducer } from './user.reducer';
import { existReducer } from './exist.reducer';
import { utilsReducer } from './utils.reducer';

const reducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  exist: existReducer,
  utils: utilsReducer,
});

export { reducer };
