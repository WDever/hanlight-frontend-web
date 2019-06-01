import { combineReducers } from 'redux';
import { registerReducer } from './register.reducer';
import { userReducer } from './user.reducer';
import { existReducer } from './exist.reducer';
import { calendarReducer } from './calendar.reducer';
import { mealReducer } from './meal.reducer';
import { notcieReducer } from './notice.reducer';
import { timeTableReducer } from './timeTable.reducer';

const reducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  exist: existReducer,
  calendar: calendarReducer,
  meal: mealReducer,
  notice: notcieReducer,
  timeTable: timeTableReducer,
});

export { reducer };
