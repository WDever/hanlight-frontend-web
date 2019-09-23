import { combineReducers } from 'redux';
import { boardReducer } from './board.reducer';
import { calendarReducer } from './calendar.reducer';
import { errorReducer } from './error.reducer';
import { festivalReducer } from './festival.reducer';
import { mealReducer } from './meal.reducer';
import { notcieReducer } from './notice.reducer';
import { timeTableReducer } from './timeTable.reducer';
import { userReducer } from './user.reducer';
import { utilReducer } from './util.reducer';

const reducer = combineReducers({
  user: userReducer,
  calendar: calendarReducer,
  meal: mealReducer,
  notice: notcieReducer,
  timeTable: timeTableReducer,
  error: errorReducer,
  board: boardReducer,
  util: utilReducer,
  festival: festivalReducer,
});

export { reducer };
