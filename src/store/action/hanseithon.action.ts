import { AxiosError } from 'axios';
import { Action } from 'redux';
import { ActiveReportData, Board, Comment, ErrorResponse } from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export const DEEM = 'DEEM';

export class Deem implements Action {
  public readonly type = DEEM;

  public constructor(public payload: boolean) {}
}

export const hanseithonActions = {
  deem: createStandardAction(DEEM)<boolean>(),
};

export type hanseithonReducerActions = Deem;
