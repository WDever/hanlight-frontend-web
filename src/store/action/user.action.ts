import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ID_RECOVERY = 'ID_RECOVERY';
export const ID_RECOVERY_SUCCESS = 'ID_RECOVERY_SUCCESS';
export const ID_RECOVERY_FAILURE = 'ID_RECOVERY_FAILURE';
export const PW_RECOVERY = 'PW_RECOVERY';
export const PW_RECOVERY_SUCCESS = 'PW_RECOVERY_SUCCESS';
export const PW_RECOVERY_FAILURE = 'PW_RECOVERY_FAILURE';

export const ID_EXIST = 'ID_EXIST';
export const ID_EXIST_SUCCESS_TRUE = 'ID_EXIST_SUCCESS_TRUE';
export const ID_EXIST_SUCCESS_FALSE = 'ID_EXIST_SUCCESS_FALSE';
export const ID_EXIST_FAILURE = 'ID_EXIST_FAILURE';
export const TP_EXIST = 'TP_EXIST';
export const TP_EXIST_SUCCESS_TRUE = 'TP_EXIST_SUCCESS_TRUE';
export const TP_EXIST_SUCCESS_FALSE = 'TP_EXIST_SUCCESS_FALSE';
export const TP_EXIST_FAILURE = 'TP_EXIST_FAILURE';
export const SIGN_KEY_EXIST = 'SIGN_KEY_EXIST';
export const SIGN_KEY_EXIST_SUCCESS_TRUE = 'SIGN_KEY_EXIST_SUCCESS_TRUE';
export const SIGN_KEY_EXIST_SUCCESS_FALSE = 'SIGN_KEY_EXIST_SUCCESS_FALSE';
export const SIGN_KEY_EXIST_FAILURE = 'SIGN_KEY_EXIST_FAILURE';

export const RESET = 'RESET';

export const VERIFY_PHONE = 'VERIFY_PHONE';
export const VERIFY_PHONE_SUCCESS = 'VERIFY_PHONE_SUCCESS';
export const VERIFY_PHONE_FAILURE = 'VERIFY_PHONE_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const SET_SIGN_KEY = 'SET_SIGN_KEY';
export const SET_FB_CODE = 'SET_FB_CODE';
export const SET_ID = 'SET_ID';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export interface LoginParam {
  id: string;
  password: string;
}

export interface IdRecoveryParam {
  code: string;
}

export interface PwRecoveryParam {
  code: string;
  id: string;
  password: string;
}

export interface ExistParam {
  [key: string]: string;
}

export interface ExistResponse {
  exist: boolean;
}

export interface VerifyPhoneParam {
  code: string;
  signKey: string;
}

export interface RegisterParam {
  id: string;
  password: string;
  signKey: string;
}

export class Login implements Action {
  public readonly type = LOGIN;

  public constructor(public payload: LoginParam) {}
}

export class LoginSuccess implements Action {
  public readonly type = LOGIN_SUCCESS;

  public constructor(
    public payload: {
      accessToken: string;
      user: {
        type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
        admin: number;
        name: string;
        major: string | null;
        grade: number | null;
        classNum: number | null;
        studentNum: number | null;
      };
    },
  ) {}
}

export class LoginFailure implements Action {
  public readonly type = LOGIN_FAILURE;
}

export class IdRecovery implements Action {
  public readonly type = ID_RECOVERY;

  public constructor(public payload: IdRecoveryParam) {}
}

export class IdRecoverySuccess implements Action {
  public readonly type = ID_RECOVERY_SUCCESS;

  public constructor(public payload: { id: string }) {}
}

export class IdRecoveryFailure implements Action {
  public readonly type = ID_RECOVERY_FAILURE;
}

export class PwRecovery implements Action {
  public readonly type = PW_RECOVERY;

  public constructor(public payload: PwRecoveryParam) {}
}

export class PwRecoverySuccess implements Action {
  public readonly type = PW_RECOVERY_SUCCESS;

  public constructor(public payload: { success: boolean }) {}
}

export class PwRecoveryFailure implements Action {
  public readonly type = PW_RECOVERY_FAILURE;
}

export class IdExist implements Action {
  public readonly type = ID_EXIST;

  public constructor(public payload: ExistParam) {}
}

export class IdExistSuccessTrue implements Action {
  public readonly type = ID_EXIST_SUCCESS_TRUE;

  public constructor(public payload: { exist: boolean }) {}
}

export class IdExistSuccessFalse implements Action {
  public readonly type = ID_EXIST_SUCCESS_FALSE;

  public constructor(public payload: { exist: boolean }) {}
}

export class IdExistFailure implements Action {
  public readonly type = ID_EXIST_FAILURE;
}

export class TpExist implements Action {
  public readonly type = TP_EXIST;

  public constructor(public payload: ExistParam) {}
}

export class TpExistSuccessTrue implements Action {
  public readonly type = TP_EXIST_SUCCESS_TRUE;

  public constructor(public payload: ExistResponse) {}
}

export class TpExistSuccessFalse implements Action {
  public readonly type = TP_EXIST_SUCCESS_FALSE;

  public constructor(public payload: ExistResponse) {}
}

export class TpExistFailure implements Action {
  public readonly type = TP_EXIST_FAILURE;
}

export class SignKeyExist implements Action {
  public readonly type = SIGN_KEY_EXIST;

  public constructor(public payload: ExistParam) {}
}

export class SingKeyExistSuccessTrue implements Action {
  public readonly type = SIGN_KEY_EXIST_SUCCESS_TRUE;

  public constructor(public payload: ExistResponse) {}
}

export class SingKeyExistSuccessFalse implements Action {
  public readonly type = SIGN_KEY_EXIST_SUCCESS_FALSE;

  public constructor(public payload: ExistResponse) {}
}

export class SignKeyExistFailure implements Action {
  public readonly type = SIGN_KEY_EXIST_FAILURE;
}

export class VerifyPhone implements Action {
  public readonly type = VERIFY_PHONE;

  public constructor(public payload: VerifyPhoneParam) {}
}

export class VerifyPhoneSuccess implements Action {
  public readonly type = VERIFY_PHONE_SUCCESS;

  public constructor(public payload: { success: boolean }) {}
}

export class VerifyPhoneFailure implements Action {
  public readonly type = VERIFY_PHONE_FAILURE;
}

export class Register implements Action {
  public readonly type = REGISTER;

  public constructor(public payload: RegisterParam) {}
}

export class RegisterSuccess implements Action {
  public readonly type = REGISTER_SUCCESS;

  public constructor(public payload: { success: boolean }) {}
}

export class RegisterFailure implements Action {
  public readonly type = REGISTER_FAILURE;
}

export class SetSignKey implements Action {
  public readonly type = SET_SIGN_KEY;

  public constructor(public payload: string) {}
}

export class Reset implements Action {
  public readonly type = RESET;
}

export class SetFbCode implements Action {
  public readonly type = SET_FB_CODE;

  public constructor(public payload: string) {}
}

export class SetId implements Action {
  public readonly type = SET_ID;

  public constructor(public payload: string) {}
}

export class GetUser implements Action {
  public readonly type = GET_USER;

  public constructor(public payload: string) {}
}

export class GetUserSuccess implements Action {
  public readonly type = GET_USER_SUCCESS;

  public constructor(
    public payload: {
      token: string;
      user: {
        type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
        admin: number;
        name: string;
        major: string | null;
        grade: number | null;
        classNum: number | null;
        studentNum: number | null;
      };
    },
  ) {}
}

export class GetUserFailure implements Action {
  public readonly type = GET_USER_FAILURE;
}

export const userActions = {
  login: createStandardAction(LOGIN)<LoginParam>(),
  idRecovery: createStandardAction(ID_RECOVERY)<IdRecoveryParam>(),
  pwRecovery: createStandardAction(PW_RECOVERY)<PwRecoveryParam>(),
  idExist: createStandardAction(ID_EXIST)<ExistParam>(),
  tpExist: createStandardAction(TP_EXIST)<ExistParam>(),
  signKeyExist: createStandardAction(SIGN_KEY_EXIST)<ExistParam>(),
  verifyPhone: createStandardAction(VERIFY_PHONE)<VerifyPhoneParam>(),
  register: createStandardAction(REGISTER)<RegisterParam>(),
  setSignKey: createStandardAction(SET_SIGN_KEY)<string>(),
  reset: createStandardAction(RESET)(),
  setFbCode: createStandardAction(SET_FB_CODE)<string>(),
  setId: createStandardAction(SET_ID)<string>(),
  getUser: createStandardAction(GET_USER)<string>(),
};

export type userReducerActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | IdRecovery
  | IdRecoverySuccess
  | IdRecoveryFailure
  | PwRecovery
  | PwRecoverySuccess
  | PwRecoveryFailure
  | IdExist
  | IdExistSuccessTrue
  | IdExistSuccessFalse
  | IdExistFailure
  | TpExist
  | TpExistSuccessTrue
  | TpExistSuccessFalse
  | TpExistFailure
  | SignKeyExist
  | SingKeyExistSuccessTrue
  | SingKeyExistSuccessFalse
  | SignKeyExistFailure
  | Reset
  | VerifyPhone
  | VerifyPhoneSuccess
  | VerifyPhoneFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | SetSignKey
  | SetFbCode
  | SetId
  | GetUser
  | GetUserSuccess
  | GetUserFailure;
