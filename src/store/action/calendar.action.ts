import { createStandardAction } from 'typesafe-actions';
import { Action } from 'redux';
import { CalendarItem, CalendarRecentItem } from 'store';

export const CALENDAR = 'CALENDAR';
export const CALENDAR_SUCCESS = 'CALENDAR_SUCCESS';
export const CALENDAR_FAILURE = 'CALENDAR_FAILURE';
export const CALENDAR_RECENT = 'CALENDAR_RECENT';
export const CALENDAR_RECENT_SUCCESS = 'CALENDAR_RECENT_SUCCESS';
export const CALENDAR_RECENT_FAILURE = 'CALENDAR_RECENT_FAILURE';

export interface CalendarParams {
  access_token: string | null;
  month: string;
  year: string;
}

export interface CalendarResType {
  success: boolean;
  data: {
    calendar: CalendarItem[];
  };
}

export interface CalendarRecentResType {
  success: boolean;
  data: {
    calendar: CalendarRecentItem[];
  };
}

export class Calendar implements Action {
  public readonly type = CALENDAR;

  public constructor(public payload: CalendarParams) {}
}

export class CalendarSuccess implements Action {
  public readonly type = CALENDAR_SUCCESS;

  public constructor(public payload: CalendarResType) {}
}

export class CalendarFailure implements Action {
  public readonly type = CALENDAR_FAILURE;
}

export class CalendarRecent implements Action {
  public readonly type = CALENDAR_RECENT;

  public constructor(public payload: string | null) {}
}

export class CalendarRecentSuccess implements Action {
  public readonly type = CALENDAR_RECENT_SUCCESS;

  public constructor(public payload: CalendarRecentResType) {}
}

export class CalendarRecentFailure implements Action {
  public readonly type = CALENDAR_RECENT_FAILURE;
}

export const calendarActions = {
  calendar: createStandardAction(CALENDAR)<CalendarParams>(),
  calendarRecent: createStandardAction(CALENDAR_RECENT)<string>(),
};

export type calendarReducerActions = | Calendar
| CalendarSuccess
| CalendarFailure
| CalendarRecent
| CalendarRecentSuccess
| CalendarRecentFailure;
