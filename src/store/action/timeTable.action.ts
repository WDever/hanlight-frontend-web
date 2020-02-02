import { Action } from 'redux';
import { createAction } from 'typesafe-actions';

export const GET_TIMETABLE = 'GET_TIMETABLE';
export const GET_TIMETABLE_SUCCESS = 'GET_TIMETABLE_SUCCESS';
export const GET_TIMETABLE_FAILURE = 'GET_TIMETABLE_FAILURE';

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

export class GetTimetable implements Action {
  public readonly type = GET_TIMETABLE;

  public constructor(public payload: string | null) {}
}

export class GetTimetableSuccess implements Action {
  public readonly type = GET_TIMETABLE_SUCCESS;

  public constructor(public payload: TimetableResType) {}
}

export class GetTimetableFailure implements Action {
  public readonly type = GET_TIMETABLE_FAILURE;
}

export const timeTableActions = {
  getTimeTable: createAction(GET_TIMETABLE)<string>(),
};

export type timeTableReducerActions =
  | GetTimetable
  | GetTimetableSuccess
  | GetTimetableFailure;
