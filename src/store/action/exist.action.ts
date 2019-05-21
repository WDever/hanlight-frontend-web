import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const EXIST = 'EXIST';
export const EXIST_SUCCESS = 'EXIST_SUCCESS';
export const EXIST_FAILURE = 'EXIST_FAILURE';
export const ID_EXIST = 'ID_EXIST';
export const ID_EXIST_SUCCESS = 'ID_EXIST_SUCCESS';
export const ID_EXIST_FAILURE = 'ID_EXIST_FAILURE';
export const TP_EXIST = 'TP_EXIST';
export const TP_EXIST_SUCCESS = 'TP_EXISIT_SUCCESS';
export const TP_EXIST_FAILURE = 'TP_EXISIT_FAILURE';
export const SIGN_KEY_EXIST = 'SIGN_KEY_EXIST';
export const SIGN_KEY_EXIST_SUCCESS = 'SIGN_KEY_EXISIT_SUCCESS';
export const SIGN_KEY_EXIST_FAILURE = 'SIGN_KEY_EXISIT_FAILURE';
export const RESET_EXIST = 'RESET_EXIST';

export interface ExistParamsType {
  key: string;
  value: string;
  type: 'ID_EXIST' | 'TP_EXIST' | 'SIGN_KEY_EXIST';
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

export class Exist implements Action {
  public readonly type = EXIST;

  public constructor(public payload: ExistParamsType) {}
}

export class ExistSuccess implements Action {
  public readonly type = EXIST_SUCCESS;
}

export class ExistFailure implements Action {
  public readonly type = EXIST_FAILURE;
}

export class IdExist implements Action {
  public readonly type = ID_EXIST;

  public constructor(public payload: ExistResType) {}
}

export class IdExistSuccess implements Action {
  public readonly type = ID_EXIST_SUCCESS;

  public constructor(public payload: ExistResType) {}
}

export class IdExistFailure implements Action {
  public readonly type = ID_EXIST_FAILURE;
}

export class TpExist implements Action {
  public readonly type = ID_EXIST;

  public constructor(public payload: ExistResType) {}
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

  public constructor(public payload: ExistResType) {}
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
  exist: createStandardAction(EXIST)<ExistParamsType>(),
  reset: createStandardAction(RESET_EXIST)(),
};

export type existReducerActions = | Exist
| ExistSuccess
| ExistFailure
| IdExistSuccess
| IdExistFailure
| TpExistSuccess
| TpExistFailure
| SingKeyExistSuccess
| SignKeyExistFailure
| ResetExist;
