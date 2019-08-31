import { BoardModel } from './board.model';
import { CalendarModel } from './calendar.model';
import { ErrorModel } from './error.model';
import { HanlightMusicModel } from './hanlight-music';
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
  hanlightMusic: HanlightMusicModel;
}

export * from './timeTable.model';
export * from './user.model';
export * from './calendar.model';
export * from './notice.model';
export * from './meal.model';
export * from './error.model';
export * from './board.model';
export * from './util.model';
export * from './hanlight-music';
export * from './common';
export * from './user.model';
