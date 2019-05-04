import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const GET_STATE = 'GET_STATE';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_FAILURE = 'GET_STATE_FAILURE';
export const GET_CODE = 'GET_CODE';
export const VERIFY_PHONE = 'VERIFY_PHONE';
export const VERIFY_PHONE_SUCCESS = 'VERIFY_PHONE_SUCCESS';
export const VERIFY_PHONE_FAILURE = 'VERIFY_PHONE_FAILURE';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export type PinType = string;

export interface PhoneCheckResType {
  code: string;
  state: string;
  status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS';
}

export interface StateResType {
  state: string;
}

export interface VerifyPhoneParams {
  code: string;
  state: string;
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

export class GetState implements Action {
  public readonly type = GET_STATE;

  public constructor(public payload: PinType) {}
}

export class GetStateSuccess implements Action {
  public readonly type = GET_STATE_SUCCESS;

  public constructor(public payload: StateResType) {}
}

export class GetStateFailure implements Action {
  public readonly type = GET_STATE_FAILURE;
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

export const registerActions = {
  getState: createStandardAction(GET_STATE)<PinType>(),
  verifyPhone: createStandardAction(VERIFY_PHONE)<VerifyPhoneParams>(),
  register: createStandardAction(REGISTER)<RegisterParams>(),
};

export type registerReducerActions = | GetState
| GetStateSuccess
| GetStateFailure
| VerifyPhone
| VerifyPhoneSuccess
| VerifyPhoneFailure
| Register
| RegisterSuccess
| RegisterFailure;
