import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const ID_EXIST = 'ID_EXIST';
export const ID_EXIST_SUCCESS = 'ID_EXIST_SUCCESS';
export const ID_EXIST_FAILURE = 'ID_EXIST_FAILURE';
export const TP_EXIST = 'TP_EXIST';
export const TP_EXIST_SUCCESS = 'TP_EXIST_SUCCESS';
export const TP_EXIST_FAILURE = 'TP_EXIST_FAILURE';
export const SIGN_KEY_EXIST = 'SIGN_KEY_EXIST';
export const SIGN_KEY_EXIST_SUCCESS = 'SIGN_KEY_EXISIT_SUCCESS';
export const SIGN_KEY_EXIST_FAILURE = 'SIGN_KEY_EXISIT_FAILURE';
export const RESET_EXIST = 'RESET_EXIST';

export interface ExistParamsType {
  key: string;
  value: string;
}

export interface ExistResType {
  success: boolean;
  data: {
    exist: boolean;
  };
}

export interface ErrorResType {
  success: boolean;
  code: number;
  name: string;
  message: string;
  description: string;
}

export class IdExist implements Action {
  public readonly type = ID_EXIST;

  public constructor(public payload: string) {}
}

export class IdExistSuccess implements Action {
  public readonly type = ID_EXIST_SUCCESS;

  public constructor(public payload: ExistResType) {}
}

export class IdExistFailure implements Action {
  public readonly type = ID_EXIST_FAILURE;
}

export class TpExist implements Action {
  public readonly type = TP_EXIST;

  public constructor(public payload: string) {}
}

export class TpExistSuccess implements Action {
  public readonly type = TP_EXIST_SUCCESS;

  public constructor(public payload: ExistResType) {}
}

export class TpExistFailure implements Action {
  public readonly type = TP_EXIST_FAILURE;
}

export class SignKeyExist implements Action {
  public readonly type = SIGN_KEY_EXIST;

  public constructor(public payload: string) {}
}

export class SingKeyExistSuccess implements Action {
  public readonly type = SIGN_KEY_EXIST_SUCCESS;

  public constructor(public payload: ExistResType) {}
}

export class SignKeyExistFailure implements Action {
  public readonly type = SIGN_KEY_EXIST_FAILURE;
}

export class ResetExist implements Action {
  public readonly type = RESET_EXIST;
}

export const existActions = {
  idExist: createStandardAction(ID_EXIST)<string>(),
  tpExist: createStandardAction(TP_EXIST)<string>(),
  signKeyExist: createStandardAction(SIGN_KEY_EXIST)<string>(),
  reset: createStandardAction(RESET_EXIST)(),
};

export type existReducerActions = | IdExist
| IdExistSuccess
| IdExistFailure
| TpExist
| TpExistSuccess
| TpExistFailure
| SignKeyExist
| SingKeyExistSuccess
| SignKeyExistFailure
| ResetExist;
