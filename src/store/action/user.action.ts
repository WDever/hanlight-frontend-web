import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface LoginParams {
  id: string;
  password: string;
}

export interface LoginResType {
  success: boolean;
  data: {
    accessToken: string;
    user: {
      type: string;
      admin: boolean;
      name: string;
      major: string;
      grade: string;
      classNum: string;
      studentNum: string;
    };
  };
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

export const userAcions = {
  login: createStandardAction(LOGIN)<LoginParams>(),
};

export type userReducerActions = Login | LoginSuccess | LoginFailure;
