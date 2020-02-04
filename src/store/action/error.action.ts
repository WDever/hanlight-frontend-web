import { AxiosError } from 'axios';
import { Action } from 'redux';
import { ErrorResponse } from 'store/model';
import { createAction } from 'typesafe-actions';

export const SET_ERROR = 'SET_ERROR';

export const RESET_ERROR = 'RESET_ERROR';

export class SetError implements Action {
  public readonly type = SET_ERROR;

  public constructor(public payload: { err: AxiosError<ErrorResponse> }) {}
}

export class ResetError implements Action {
  public readonly type = RESET_ERROR;
}

export const errorActions = {
  setError: createAction(SET_ERROR)<ErrorResponse>(),
  resetError: createAction(RESET_ERROR)(),
};

export type errorReducerActions = SetError | ResetError;
