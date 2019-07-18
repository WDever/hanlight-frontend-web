import { BoardModel } from './board.model';
import { CalendarModel } from './calendar.model';
import { ErrorModel } from './error.model';
import { HanseithonModel } from './hanseithon.model';
import { MealModel } from './meal.model';
import { NoticeModel } from './notice.model';
import { TimeTableModel } from './timeTable.model';
import { UserModel } from './user.model';
import { UtilModel } from './util.model';

export interface AppState {
  user: UserModel;
  calendar: CalendarModel;
  notice: NoticeModel;
  timeTable: TimeTableModel;
  meal: MealModel;
  error: ErrorModel;
  board: BoardModel;
  util: UtilModel;
  hanseithon: HanseithonModel;
}

export * from './timeTable.model';
export * from './calendar.model';
export * from './notice.model';
export * from './meal.model';
export * from './error.model';
export * from './board.model';
export * from './util.model';
export * from './hanseithon.model';
