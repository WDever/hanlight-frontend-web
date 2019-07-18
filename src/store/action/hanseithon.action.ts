import { AxiosError } from 'axios';
import { Action } from 'redux';
import {
  ActiveReportData,
  Board,
  Category,
  Comment,
  ErrorResponse,
  GetTeamResTeyp,
  ModalTypes,
  PostTeamParams,
  PostTeamResType,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export const DEEM = 'DEEM';

export const MODAL = 'MODAL';

export const GET_TEAM = 'GET_TEAM';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const GET_TEAM_FAILURE = 'GET_TEAM_FAILURE';

export const POST_TEAM = 'POST_TEAM';
export const POST_TEAM_SUCCESS = 'POST_TEAM_SUCCESS';
export const POST_TEAM_FAILURE = 'POST_TEAM_FAILURE';

export class Deem implements Action {
  public readonly type = DEEM;

  public constructor(public payload: boolean) {}
}

export class Modal implements Action {
  public readonly type = MODAL;

  public constructor(public payload: ModalTypes) {}
}

export class GetTeam implements Action {
  public readonly type = GET_TEAM;

  public constructor(public payload: Category) {}
}

export class GetTeamSuccess implements Action {
  public readonly type = GET_TEAM_SUCCESS;

  public constructor(public payload: GetTeamResTeyp) {}
}

export class GetTeamFailure implements Action {
  public readonly type = GET_TEAM_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class PostTeam implements Action {
  public readonly type = POST_TEAM;

  public constructor(public payload: PostTeamParams) {}
}

export class PostTeamSuccess implements Action {
  public readonly type = POST_TEAM_SUCCESS;

  public constructor(public payload: PostTeamResType) {}
}

export class PostTeamFailure implements Action {
  public readonly type = POST_TEAM_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export const hanseithonActions = {
  deem: createStandardAction(DEEM)<boolean>(),
  modal: createStandardAction(MODAL)<ModalTypes>(),
  getTeam: createStandardAction(GET_TEAM)<Category>(),
};

export type hanseithonReducerActions =
  | Deem
  | Modal
  | GetTeam
  | GetTeamSuccess
  | GetTeamFailure;
