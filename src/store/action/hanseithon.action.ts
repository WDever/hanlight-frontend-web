import { AxiosError } from 'axios';
import { Action } from 'redux';
import {
  ActiveReportData,
  Board,
  Comment,
  ErrorResponse,
  ModalTypes,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export const DEEM = 'DEEM';

export const MODAL = 'MODAL';

export class Deem implements Action {
  public readonly type = DEEM;

  public constructor(public payload: boolean) {}
}

export class Modal implements Action {
  public readonly type = MODAL;

  public constructor(public payload: ModalTypes) {}
}

export const hanseithonActions = {
  deem: createStandardAction(DEEM)<boolean>(),
  modal: createStandardAction(MODAL)<ModalTypes>(),
};

export type hanseithonReducerActions = Deem | Modal;
