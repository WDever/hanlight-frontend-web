import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { utilsReducer } from './utils.reducer';

const reducer = combineReducers({
  user: userReducer,
  utils: utilsReducer,
});

export { reducer };
