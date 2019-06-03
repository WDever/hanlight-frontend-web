import { combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { calendarReducer } from './calendar.reducer';
import { mealReducer } from './meal.reducer';
import { notcieReducer } from './notice.reducer';
import { timeTableReducer } from './timeTable.reducer';

const reducer = combineReducers({
  user: userReducer,
  calendar: calendarReducer,
  meal: mealReducer,
  notice: notcieReducer,
  timeTable: timeTableReducer,
});

export { reducer };
