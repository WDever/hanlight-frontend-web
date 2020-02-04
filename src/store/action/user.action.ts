import { Action } from 'redux';
import { ErrorResponse } from 'store/model';
import { createAction } from 'typesafe-actions';

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

export const RESET_USER = 'RESET_USER';

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

export const PATCH_PASSWORD = 'PATCH_PASSWORD';
export const PATCH_PASSWORD_SUCCESS = 'PATCH_PASSWORD_SUCCESS';
export const PATCH_PASSWORD_FAILURE = 'PATCH_PASSWORD_FAILURE';

export const PATCH_PHONE = 'PATCH_PHONE';
export const PATCH_PHONE_SUCCESS = 'PATCH_PHONE_SUCCESS';
export const PATCH_PHONE_FAILURE = 'PATCH_PHONE_FAILURE';

export const POST_USER_IMG = 'POST_USER_IMG';
export const POST_USER_IMG_SUCCESS = 'POST_USER_IMG_SUCCESS';
export const POST_USER_IMG_FAILURE = 'POST_USER_IMG_FAILURE';

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

export interface PatchPwParam {
  accessToken: string;
  password: string;
}

export interface PatchPhoneParam {
  accessToken: string;
  code: string;
}

export interface PostUserImgParmas {
  accessToken: string;
  file: File;
}

export interface PostUserImgResType {
  user: {
    type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
    admin: number;
    name: string;
    id: string;
    major: string | null;
    grade: number | null;
    classNum: number | null;
    studentNum: number | null;
    image: string;
  };
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
        id: string;
        type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
        admin: number;
        name: string;
        major: string | null;
        grade: number | null;
        classNum: number | null;
        studentNum: number | null;
        image: string | null;
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

  public constructor(public payload: ErrorResponse) {}
}

export class PwRecovery implements Action {
  public readonly type = PW_RECOVERY;

  public constructor(public payload: PwRecoveryParam) {}
}

export class PwRecoverySuccess implements Action {
  public readonly type = PW_RECOVERY_SUCCESS;

  public constructor(
    public payload: { success: boolean; accessToken: string },
  ) {}
}

export class PwRecoveryFailure implements Action {
  public readonly type = PW_RECOVERY_FAILURE;

  public constructor(public payload: ErrorResponse) {}
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

  public constructor(public payload: ErrorResponse) {}
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

  public constructor(public payload: ErrorResponse) {}
}

export class SetSignKey implements Action {
  public readonly type = SET_SIGN_KEY;

  public constructor(public payload: string) {}
}

export class ResetUser implements Action {
  public readonly type = RESET_USER;
}

export class SetFbCode implements Action {
  public readonly type = SET_FB_CODE;

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
        id: string;
        type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
        admin: number;
        name: string;
        major: string | null;
        grade: number | null;
        classNum: number | null;
        studentNum: number | null;
        image: string | null;
      };
    },
  ) {}
}

export class GetUserFailure implements Action {
  public readonly type = GET_USER_FAILURE;
}

export class PatchPassword implements Action {
  public readonly type = PATCH_PASSWORD;

  public constructor(public payload: PatchPwParam) {}
}

export class PatchPasswordSuccess implements Action {
  public readonly type = PATCH_PASSWORD_SUCCESS;
}

export class PatchPasswordFailure implements Action {
  public readonly type = PATCH_PASSWORD_FAILURE;
}

export class PatchPhone implements Action {
  public readonly type = PATCH_PHONE;

  public constructor(public payload: PatchPhoneParam) {}
}

export class PatchPhoneSuccess implements Action {
  public readonly type = PATCH_PHONE_SUCCESS;
}

export class PatchPhoneFailure implements Action {
  public readonly type = PATCH_PHONE_FAILURE;
}

export class PostUserImg implements Action {
  public readonly type = POST_USER_IMG;

  public constructor(public payload: PostUserImgParmas) {}
}

export class PostUserImgSuccess implements Action {
  public readonly type = POST_USER_IMG_SUCCESS;

  public constructor(public payload: PostUserImgResType) {}
}

export class PostUserImgFailure implements Action {
  public readonly type = POST_USER_IMG_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export const userActions = {
  login: createAction(LOGIN)<LoginParam>(),
  idRecovery: createAction(ID_RECOVERY)<IdRecoveryParam>(),
  pwRecovery: createAction(PW_RECOVERY)<PwRecoveryParam>(),
  idExist: createAction(ID_EXIST)<ExistParam>(),
  verifyPhone: createAction(VERIFY_PHONE)<VerifyPhoneParam>(),
  register: createAction(REGISTER)<RegisterParam>(),
  setSignKey: createAction(SET_SIGN_KEY)<string>(),
  resetUser: createAction(RESET_USER)(),
  setFbCode: createAction(SET_FB_CODE)<string>(),
  setId: createAction(SET_ID)<string>(),
  getUser: createAction(GET_USER)<string>(),
  patchPassword: createAction(PATCH_PASSWORD)<PatchPwParam>(),
  patchPhone: createAction(PATCH_PHONE)<PatchPhoneParam>(),
  postUserImg: createAction(POST_USER_IMG)<PostUserImgParmas>(),
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
  | ResetUser
  | VerifyPhone
  | VerifyPhoneSuccess
  | VerifyPhoneFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | SetSignKey
  | SetFbCode
  | GetUser
  | GetUserSuccess
  | GetUserFailure
  | PatchPassword
  | PatchPasswordSuccess
  | PatchPasswordFailure
  | PatchPhone
  | PatchPhoneSuccess
  | PatchPhoneFailure
  | PostUserImg
  | PostUserImgSuccess
  | PostUserImgFailure;
