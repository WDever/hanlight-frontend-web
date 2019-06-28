import { Action } from 'redux';
import { CalendarItem, CalendarRecentItem } from 'store';
import { createStandardAction } from 'typesafe-actions';

export const GET_CALENDAR = 'GET_CALENDAR';
export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
export const GET_CALENDAR_FAILURE = 'GET_CALENDAR_FAILURE';
export const GET_CALENDAR_RECENT = 'GET_CALENDAR_RECENT';
export const GET_CALENDAR_RECENT_SUCCESS = 'GET_CALENDAR_RECENT_SUCCESS';
export const GET_CALENDAR_RECENT_FAILURE = 'GET_CALENDAR_RECENT_FAILURE';

export interface GetCalendarParams {
  accessToken: string | null;
  month: string;
  year: string;
}

export interface GetCalendarResType {
  success: boolean;
  data: {
    calendar: CalendarItem[];
  };
}

export interface GetCalendarRecentResType {
  success: boolean;
  data: {
    calendar: CalendarRecentItem[];
  };
}

export class GetCalendar implements Action {
  public readonly type = GET_CALENDAR;

  public constructor(public payload: GetCalendarParams) {}
}

export class GetCalendarSuccess implements Action {
  public readonly type = GET_CALENDAR_SUCCESS;

  public constructor(public payload: GetCalendarResType) {}
}

export class GetCalendarFailure implements Action {
  public readonly type = GET_CALENDAR_FAILURE;
}

export class GetCalendarRecent implements Action {
  public readonly type = GET_CALENDAR_RECENT;

  public constructor(public payload: string | null) {}
}

export class GetCalendarRecentSuccess implements Action {
  public readonly type = GET_CALENDAR_RECENT_SUCCESS;

  public constructor(public payload: GetCalendarRecentResType) {}
}

export class GetCalendarRecentFailure implements Action {
  public readonly type = GET_CALENDAR_RECENT_FAILURE;
}

export const calendarActions = {
  getCalendar: createStandardAction(GET_CALENDAR)<GetCalendarParams>(),
  getCalendarRecent: createStandardAction(GET_CALENDAR_RECENT)<string>(),
};

export type calendarReducerActions =
  | GetCalendar
  | GetCalendarSuccess
  | GetCalendarFailure
  | GetCalendarRecent
  | GetCalendarRecentSuccess
  | GetCalendarRecentFailure;
