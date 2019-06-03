import { UserModel } from './user.model';
import { CalendarModel } from './calendar.model';
import { NoticeModel } from './notice.model';
import { TimeTableModel } from './timeTable.model';
import { MealModel } from './meal.model';

export interface AppState {
  user: UserModel;
  calendar: CalendarModel;
  notice: NoticeModel;
  timeTable: TimeTableModel;
  meal: MealModel;
}

export * from './timeTable.model';
export * from './calendar.model';
export * from './notice.model';
export * from './meal.model';
