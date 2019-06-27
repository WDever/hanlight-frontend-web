import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { CalendarItem, CalendarRecentItem } from 'store';
import { ErrorResponse } from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export const SET_ERROR = 'SET_ERROR';

export const RESET_ERROR = 'RESET_ERROR';

export class SetError implements Action {
  public readonly type = SET_ERROR;

  public constructor(public payload: AxiosResponse<ErrorResponse>) {}
}

export class ResetError implements Action {
  public readonly type = RESET_ERROR;
}

export const errorActions = {
  setError: createStandardAction(SET_ERROR)<ErrorResponse>(),
  resetError: createStandardAction(RESET_ERROR)(),
};

export type errorReducerActions = SetError | ResetError;
