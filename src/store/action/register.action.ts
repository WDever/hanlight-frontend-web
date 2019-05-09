import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const GET_CODE = 'GET_CODE';
export const VERIFY_PHONE = 'VERIFY_PHONE';
export const VERIFY_PHONE_SUCCESS = 'VERIFY_PHONE_SUCCESS';
export const VERIFY_PHONE_FAILURE = 'VERIFY_PHONE_FAILURE';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_SIGN_KEY = 'SET_SIGN_KEY';

export interface PhoneCheckResType {
  code: string;
  state: string;
  status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS';
}

export interface VerifyPhoneParams {
  code: string;
  signKey: string;
}

export interface VerifyPhoneResType {
  success: boolean;
}

export interface RegisterParams {
  id: string;
  password: string;
  signKey: string;
}

export interface RegisterResType {
  success: boolean;
}

export class VerifyPhone implements Action {
  public readonly type = VERIFY_PHONE;

  public constructor(public payload: VerifyPhoneParams) {}
}

export class VerifyPhoneSuccess implements Action {
  public readonly type = VERIFY_PHONE_SUCCESS;

  public constructor(public payload: VerifyPhoneResType) {}
}

export class VerifyPhoneFailure implements Action {
  public readonly type = VERIFY_PHONE_FAILURE;
}

export class Register implements Action {
  public readonly type = REGISTER;

  public constructor(public payload: RegisterParams) {}
}

export class RegisterSuccess implements Action {
  public readonly type = REGISTER_SUCCESS;

  public constructor(public payload: RegisterResType) {}
}

export class RegisterFailure implements Action {
  public readonly type = REGISTER_FAILURE;
}

export class SetSignKey implements Action {
  public readonly type = SET_SIGN_KEY;

  public constructor(public payload: string) {}
}

export const registerActions = {
  verifyPhone: createStandardAction(VERIFY_PHONE)<VerifyPhoneParams>(),
  register: createStandardAction(REGISTER)<RegisterParams>(),
  setSignKey: createStandardAction(SET_SIGN_KEY)<string>(),
};

export type registerReducerActions =
| VerifyPhone
| VerifyPhoneSuccess
| VerifyPhoneFailure
| Register
| RegisterSuccess
| RegisterFailure
| SetSignKey;
