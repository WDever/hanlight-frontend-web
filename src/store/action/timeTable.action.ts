import { createStandardAction } from 'typesafe-actions';
import { Action } from 'redux';

export const TIMETABLE = 'TIMETABLE';
export const TIMETABLE_SUCCESS = 'TIMETABLE_SUCCESS';
export const TIMETABLE_FAILURE = 'TIMETABLE_FAILURE';

export interface TimetableResType {
  success: boolean;
  data: {
    timetable: {
      월: string[];
      화: string[];
      수: string[];
      목: string[];
      금: string[];
    };
  };
}

export class Timetable implements Action {
  public readonly type = TIMETABLE;

  public constructor(public payload: string | null) {}
}

export class TimetableSuccess implements Action {
  public readonly type = TIMETABLE_SUCCESS;

  public constructor(public payload: TimetableResType) {}
}

export class TimetableFailure implements Action {
  public readonly type = TIMETABLE_FAILURE;
}

export const timeTableActions = {
  timeTable: createStandardAction(TIMETABLE)<string>(),
};

export type timeTableReducerActions = | Timetable
| TimetableSuccess
| TimetableFailure;
