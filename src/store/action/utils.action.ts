import { createStandardAction } from 'typesafe-actions';
import { Action } from 'redux';

export const TIMETABLE = 'TIMETABLE';
export const TIMETABLE_SUCCESS = 'TIMETABLE_SUCCESS';
export const TIMETABLE_FAILURE = 'TIMETABLE_FAILURE';
export const CALENDAR = 'CALENDAR';
export const CALENDAR_SUCCESS = 'CALENDAR_SUCCESS';
export const CALENDAR_FAILURE = 'CALENDAR_FAILURE';
export const NOTICE = 'NOTICE';
export const NOTICE_SUCCESS = 'NOTICE_SUCCESS';
export const NOTICE_FAILURE = 'NOTICE_FAILURE';
export const NOTICE_POST = 'NOTICE_POST';
export const NOTICE_POST_SUCCESS = 'NOTICE_POST_SUCCESS';
export const NOTICE_POST_FAILURE = 'NOTICE_POST_FAILURE';
export const MEAL = 'MEAL';
export const MEAL_SUCCESS = 'MEAL_SUCCESS';
export const MEAL_FAILURE = 'MEAL_FAILURE';
export const MEAL_ORDER = 'MEAL_ORDER';
export const MEAL_ORDER_SUCCESS = 'MEAL_ORDER_SUCCESS';
export const MEAL_ORDER_FAILURE = 'MEAL_ORDER_FAILURE';

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

export interface CalendarParams {
  access_token: string;
  month: string;
}

export interface CalendarItem {
  date: string;
  detail: string;
}

export interface CalendarResType {
  success: boolean;
  data: {
    calendar: CalendarItem[];
  };
}

export interface NoticeParams {
  access_token: string;
  page?: string;
  title?: string;
}

export interface NoticePostParams {
  access_token: string;
  id: string;
}

export interface NoticeListItem {
  pk: number;
  title: string;
  updateAt: string;
  read: boolean;
}

export interface NoticeListResType {
  success: boolean;
  data: {
    notice: NoticeListItem[];
  };
}

export interface NoticePostResType {
  success: boolean;
  data: {
    pk: number;
    title: string;
    content: string;
    updateAt: string;
  };
}

export interface MealParams {
  access_token: string;
  sort: string;
}

export interface MealItem {
  date: number;
  detail: string;
}

export interface MealResType {
  success: boolean;
  data: {
    meal: MealItem[];
  };
}

export interface MealOrderResType {
  success: boolean;
  data: {
    order: string;
  };
}

export class Timetable implements Action {
  public readonly type = TIMETABLE;

  public constructor(public payload: string) {}
}

export class TimetableSuccess implements Action {
  public readonly type = TIMETABLE_SUCCESS;

  public constructor(public payload: TimetableResType) {}
}

export class TimetableFailure implements Action {
  public readonly type = TIMETABLE_FAILURE;
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

export class Notice implements Action {
  public readonly type = NOTICE;

  public constructor(public payload: NoticeParams) {}
}

export class NoticeSuccess implements Action {
  public readonly type = NOTICE_SUCCESS;

  public constructor(public payload: NoticeListResType) {}
}

export class NoticeFailure implements Action {
  public readonly type = NOTICE_FAILURE;
}

export class NoticePost implements Action {
  public readonly type = NOTICE_POST;

  public constructor(public payload: NoticePostParams) {}
}

export class NoticePostSuccess implements Action {
  public readonly type = NOTICE_POST_SUCCESS;

  public constructor(public payload: NoticePostResType) {}
}

export class NoticePostFailure implements Action {
  public readonly type = NOTICE_POST_FAILURE;
}

export class Meal implements Action {
  public readonly type = MEAL;

  public constructor(public payload: MealParams) {}
}

export class MealSuccess implements Action {
  public readonly type = MEAL_SUCCESS;

  public constructor(public payload: MealResType) {}
}

export class MealFailure implements Action {
  public readonly type = MEAL_FAILURE;
}

export class MealOrder implements Action {
  public readonly type = MEAL_ORDER;

  public constructor(public payload: string) {}
}

export class MealOrderSuccess implements Action {
  public readonly type = MEAL_ORDER_SUCCESS;

  public constructor(public payload: MealOrderResType) {}
}

export class MealOrderFailure implements Action {
  public readonly type = MEAL_ORDER_FAILURE;
}

export const utilsActions = {
  timetable: createStandardAction(TIMETABLE)<string>(),
  calendar: createStandardAction(CALENDAR)<CalendarParams>(),
  notice: createStandardAction(NOTICE)<NoticeParams>(),
  noticePost: createStandardAction(NOTICE_POST)<NoticePostParams>(),
  meal: createStandardAction(MEAL)<MealParams>(),
  mealOrder: createStandardAction(MEAL_ORDER)<string>(),
};

export type utilsReducerActions = | Timetable
| TimetableSuccess
| TimetableFailure
| Calendar
| CalendarSuccess
| CalendarFailure
| Notice
| NoticeSuccess
| NoticeFailure
| NoticePost
| NoticePostSuccess
| NoticePostFailure
| Meal
| MealSuccess
| MealFailure
| MealOrder
| MealOrderFailure
| MealOrderSuccess;
