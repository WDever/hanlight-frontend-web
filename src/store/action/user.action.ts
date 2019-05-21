import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ID_FIND = 'ID_FIND';
export const ID_FIND_SUCCESS = 'ID_FIND_SUCCESS';
export const ID_FIND_FAILURE = 'ID_FIND_FAILURE';
export const PW_RECOVERY = 'PW_RECOVERY';
export const PW_RECOVERY_SUCCESS = 'PW_RECOVERY_SUCCESS';
export const PW_RECOVERY_FAILURE = 'PW_RECOVERY_FAILURE';
export const RESET_USER = 'RESET_USER';

export interface LoginParams {
  id: string;
  password: string;
}

export interface UserDataType {
  accessToken: string;
  user: {
    type: 'none' | 'student' | 'teacher' | 'graduatedStudent' | 'parent';
    admin: boolean;
    name: string;
    major: string;
    grade: string;
    classNum: string;
    studentNum: string;
  };
}

export interface LoginResType {
  success: boolean;
  data: UserDataType;
}

export interface PwRecoveryParams {
  code: string;
  id: string;
  password: string;
}

export interface PwRecoveryResType {
  success: boolean;
}

export interface IdFindResType {
  id: string;
}

export class Login implements Action {
  public readonly type = LOGIN;

  public constructor(public payload: LoginParams) {}
}

export class LoginSuccess implements Action {
  public readonly type = LOGIN_SUCCESS;

  public constructor(public payload: LoginResType) {}
}

export class LoginFailure implements Action {
  public readonly type = LOGIN_FAILURE;
}

export class IdFind implements Action {
  public readonly type = ID_FIND;

  public constructor(public payload: string) {}
}

export class IdFindSuccess implements Action {
  public readonly type = ID_FIND_SUCCESS;

  public constructor(public payload: IdFindResType) {}
}

export class IdFindFailure implements Action {
  public readonly type = ID_FIND_FAILURE;
}

export class PwRecovery implements Action {
  public readonly type = PW_RECOVERY;

  public constructor(public payload: PwRecoveryParams) {}
}

export class PwRecoverySuccess implements Action {
  public readonly type = PW_RECOVERY_SUCCESS;

  public constructor(public payload: PwRecoveryResType) {}
}

export class PwRecoveryFailure implements Action {
  public readonly type = PW_RECOVERY_FAILURE;
}

export class ResetUser implements Action {
  public readonly type = RESET_USER;
}

export const userActions = {
  login: createStandardAction(LOGIN)<LoginParams>(),
  idFind: createStandardAction(ID_FIND)<string>(),
  pwRecovery: createStandardAction(PW_RECOVERY)<PwRecoveryParams>(),
  reset: createStandardAction(RESET_USER)(),
};

export type userReducerActions = | Login
| LoginSuccess
| LoginFailure
| IdFind
| IdFindSuccess
| IdFindFailure
| PwRecovery
| PwRecoverySuccess
| PwRecoveryFailure
| ResetUser;
