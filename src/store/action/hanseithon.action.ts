import { AxiosError } from 'axios';
import { Action } from 'redux';
import {
  ActiveReportData,
  Board,
  CategoryType,
  Comment,
  ErrorResponse,
  HtUserType,
  JobType,
  MatchMember,
  MentorRequestType,
  MentorType,
  ModalTypes,
  TeamMemberType,
  TeamType,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export interface PostTeamParams {
  accessToken: string;
  category: CategoryType;
  teamName: string;
  userPosiotion: string;
}

export interface PostTeamResType {
  team: TeamType;
  code: number;
  createdAt: string;
}

export interface GetTeamResType {
  team: TeamType[];
}

export interface PutTeamParams {
  accessToken: string;
  team_pk: number;
  posiotion: string;
  code: number;
}

export interface PutTeamResType {
  teamMember: TeamMemberType;
}

export interface PostTeamMatchParams {
  accessToken: string;
  category: CategoryType;
  position: string;
  introduction: string;
}

export interface PostTeamMatchResType {
  success: boolean;
}

export interface GetTeamParams {
  accessToken: string;
  category: CategoryType;
}

export interface GetTeamMatchParams {
  accessToken: string;
  category: CategoryType;
}

export interface GetTeamMatchResType {
  match: MatchMember[];
}

export interface GetHtUserResType {
  type: HtUserType;
  team: string | null;
}

export interface GetMentorRequestResType {
  request: MentorRequestType[];
}

export interface PostMentorRequestParams {
  accessToken: string;
  content: string;
  mentor_pk: number;
}

export interface GetMentorResType {
  mentor: MentorType[];
}

export interface PatchMentorRequestParams {
  accessToken: string;
  requestPk: number;
}

export const DEEM = 'DEEM';

export const MODAL = 'MODAL';

export const AGREE = 'AGREE';

export const SET_TEAM_PK = 'SET_TEAM_PK';

export const GET_TEAM = 'GET_TEAM';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const GET_TEAM_FAILURE = 'GET_TEAM_FAILURE';

export const POST_TEAM = 'POST_TEAM';
export const POST_TEAM_SUCCESS = 'POST_TEAM_SUCCESS';
export const POST_TEAM_FAILURE = 'POST_TEAM_FAILURE';

export const PUT_TEAM = 'PUT_TEAM';
export const PUT_TEAM_SUCCESS = 'PUT_TEAM_SUCCESS';
export const PUT_TEAM_FAILURE = 'PUT_TEAM_FAILURE';

export const GET_TEAM_MATCH = 'GET_TEAM_MATCH';
export const GET_TEAM_MATCH_SUCCESS = 'GET_TEAM_MATCH_SUCCESS';
export const GET_TEAM_MATCH_FAILURE = 'GET_TEAM_MATCH_FAILURE';

export const POST_TEAM_MATCH = 'POST_TEAM_MATCH';
export const POST_TEAM_MATCH_SUCCESS = 'POST_TEAM_MATCH_SUCCESS';
export const POST_TEAM_MATCH_FAILURE = 'POST_TEAM_MATCH_FAILURE';

export const POST_OBSERVER = 'POST_OBSERVER';
export const POST_OBSERVER_SUCCESS = 'POST_OBSERVER_SUCCESS';
export const POST_OBSERVER_FAILURE = 'POST_OBSERVER_FAILURE';

export const GET_THEME = 'GET_THEME';
export const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS';
export const GET_THEME_FAILURE = 'GET_THEME_FAILURE';

export const GET_JUDGEMENT = 'GET_JUDGEMENT';
export const GET_JUDGEMENT_SUCCESS = 'GET_JUDGEMENT_SUCCESS';
export const GET_JUDGEMENT_FAILURE = 'GET_JUDGEMENT_FAILURE';

export const GET_HT_USER = 'GET_HT_USER';
export const GET_HT_USER_SUCCESS = 'GET_HT_USER_SUCCESS';
export const GET_HT_USER_FAILURE = 'GET_HT_USER_FAILURE';

export const GET_MENTOR = 'GET_MENTOR';
export const GET_MENTOR_SUCCESS = 'GET_MENTOR_SUCCESS';
export const GET_MENTOR_FAILURE = 'GET_MENTOR_FAILURE';

export const GET_MENTOR_REQUEST = 'GET_MENTOR_REQUEST';
export const GET_MENTOR_REQUEST_SUCCESS = 'GET_MENTOR_REQUEST_SUCCESS';
export const GET_MENTOR_REQUEST_FAILURE = 'GET_MENTOR_REQUEST_FAILURE';

export const POST_MENTOR_REQUEST = 'POST_MENTOR_REQUEST';
export const POST_MENTOR_REQUEST_SUCCESS = 'POST_MENTOR_REQUEST_SUCCESS';
export const POST_MENTOR_REQUEST_FAILURE = 'POST_MENTOR_REQUEST_FAILURE';

export const PATCH_MENTOR_REQUEST = 'PATCH_MENTOR_REQUEST';
export const PATCH_MENTOR_REQUEST_SUCCESS = 'PATCH_MENTOR_REQUEST_SUCCESS';
export const PATCH_MENTOR_REQUEST_FAILURE = 'PATCH_MENTOR_REQUEST_FAILURE';

export const SET_REQ_PK = 'SET_REQ_PK'

export const SET_MENTOR_PK = 'SET_MENTOR_PK';

export const RESET_HT_USER = 'RESET_HT_USER';

export const REST_STATUS = 'RESET_STATUS';

export class Deem implements Action {
  public readonly type = DEEM;

  public constructor(public payload: boolean) {}
}

export class Modal implements Action {
  public readonly type = MODAL;

  public constructor(public payload: ModalTypes) {}
}

export class Agree implements Action {
  public readonly type = AGREE;

  public constructor(public payload: boolean) {}
}

export class SetTeamPk implements Action {
  public readonly type = SET_TEAM_PK;

  public constructor(public payload: number) {}
}

export class GetTeam implements Action {
  public readonly type = GET_TEAM;

  public constructor(public payload: GetTeamParams) {}
}

export class GetTeamSuccess implements Action {
  public readonly type = GET_TEAM_SUCCESS;

  public constructor(public payload: GetTeamResType) {}
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

export class PutTeam implements Action {
  public readonly type = PUT_TEAM;

  public constructor(public payload: PutTeamParams) {}
}

export class PutTeamSuccess implements Action {
  public readonly type = PUT_TEAM_SUCCESS;

  public constructor(public payload: PutTeamResType & { pk: number }) {}
}

export class PutTeamFailure implements Action {
  public readonly type = PUT_TEAM_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetTeamMatch implements Action {
  public readonly type = GET_TEAM_MATCH;

  public constructor(public payload: GetTeamMatchParams) {}
}
export class GetTeamMatchSuccess implements Action {
  public readonly type = GET_TEAM_MATCH_SUCCESS;

  public constructor(public payload: GetTeamMatchResType) {}
}
export class GetTeamMatchFailure implements Action {
  public readonly type = GET_TEAM_MATCH_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class PostTeamMatch implements Action {
  public readonly type = POST_TEAM_MATCH;

  public constructor(public payload: PostTeamMatchParams) {}
}

export class PostTeamMatchSuccess implements Action {
  public readonly type = POST_TEAM_MATCH_SUCCESS;

  public constructor(public payload: PostTeamMatchResType) {}
}

export class PostTeamMatchFailure implements Action {
  public readonly type = POST_TEAM_MATCH_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class PostObserver implements Action {
  public readonly type = POST_OBSERVER;

  public constructor(public payload: string) {}
}

export class PostObserverSuccess implements Action {
  public readonly type = POST_OBSERVER_SUCCESS;

  public constructor(public payload: { success: boolean }) {}
}

export class PostObserverFailure implements Action {
  public readonly type = POST_OBSERVER_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetTheme implements Action {
  public readonly type = GET_THEME;

  public constructor(public payload: string) {}
}

export class GetThemeSuccess implements Action {
  public readonly type = GET_THEME_SUCCESS;

  public constructor(public payload: string) {}
}

export class GetThemeFailure implements Action {
  public readonly type = GET_THEME_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetJudgement implements Action {
  public readonly type = GET_JUDGEMENT;

  public constructor(public payload: string) {}
}

export class GetJudgementSuccess implements Action {
  public readonly type = GET_JUDGEMENT_SUCCESS;

  public constructor(public payload: string) {}
}

export class GetJudgementFailure implements Action {
  public readonly type = GET_JUDGEMENT_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetHtUser implements Action {
  public readonly type = GET_HT_USER;

  public constructor(public payload: string) {}
}

export class GetHtUserSuccess implements Action {
  public readonly type = GET_HT_USER_SUCCESS;

  public constructor(public payload: GetHtUserResType) {}
}

export class GetHtUserFailure implements Action {
  public readonly type = GET_HT_USER_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetMentor implements Action {
  public readonly type = GET_MENTOR;

  public constructor(public payload: string) {}
}

export class GetMentorSuccess implements Action {
  public readonly type = GET_MENTOR_SUCCESS;

  public constructor(public payload: GetMentorResType) {}
}

export class GetMentorFailure implements Action {
  public readonly type = GET_MENTOR_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class GetMentorRequest implements Action {
  public readonly type = GET_MENTOR_REQUEST;

  public constructor(public payload: string) {}
}

export class GetMentorRequestSuccess implements Action {
  public readonly type = GET_MENTOR_REQUEST_SUCCESS;

  public constructor(public payload: GetMentorRequestResType) {}
}

export class GetMentorRequestFailure implements Action {
  public readonly type = GET_MENTOR_REQUEST_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class PostMentorRequest implements Action {
  public readonly type = POST_MENTOR_REQUEST;

  public constructor(public payload: PostMentorRequestParams) {}
}

export class PostMentorRequestSuccess implements Action {
  public readonly type = POST_MENTOR_REQUEST_SUCCESS;
}

export class PostMentorRequestFailure implements Action {
  public readonly type = POST_MENTOR_REQUEST_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class PatchMentorRequest implements Action {
  public readonly type = PATCH_MENTOR_REQUEST;

  public constructor(public payload: PatchMentorRequestParams) {}
}

export class PatchMentorRequestSuccess implements Action {
  public readonly type = PATCH_MENTOR_REQUEST_SUCCESS;
}

export class PatchMentorRequestFailure implements Action {
  public readonly type = PATCH_MENTOR_REQUEST_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class SetReqPk implements Action {
  public readonly type = SET_REQ_PK;

  public constructor(public payload: number) {}
}

export class SetMentorPk implements Action {
  public readonly type = SET_MENTOR_PK;

  public constructor(public payload: number) {}
}

export class ResetHtUser implements Action {
  public readonly type = RESET_HT_USER;
}

export class ResetStatus implements Action {
  public readonly type = REST_STATUS;
}

export const hanseithonActions = {
  deem: createStandardAction(DEEM)<boolean>(),
  modal: createStandardAction(MODAL)<ModalTypes>(),
  agree: createStandardAction(AGREE)<boolean>(),
  setTeamPk: createStandardAction(SET_TEAM_PK)<number>(),
  getTeam: createStandardAction(GET_TEAM)<GetTeamParams>(),
  postTeam: createStandardAction(POST_TEAM)<PostTeamParams>(),
  putTeam: createStandardAction(PUT_TEAM)<PutTeamParams>(),
  getTeamMatch: createStandardAction(GET_TEAM_MATCH)<GetTeamMatchParams>(),
  postTeamMatch: createStandardAction(POST_TEAM_MATCH)<PostTeamMatchParams>(),
  postObserver: createStandardAction(POST_OBSERVER)<string>(),
  getTheme: createStandardAction(GET_THEME)<string>(),
  getJudgement: createStandardAction(GET_JUDGEMENT)<string>(),
  getMentor: createStandardAction(GET_MENTOR)<string>(),
  getMentorRequest: createStandardAction(GET_MENTOR_REQUEST)<string>(),
  postMentorRequest: createStandardAction(POST_MENTOR_REQUEST)<
    PostMentorRequestParams
  >(),
  patchMentorRequest: createStandardAction(PATCH_MENTOR_REQUEST)<
    PatchMentorRequestParams
  >(),
  setReqPk: createStandardAction(SET_REQ_PK)<number>(),
  setMentorPk: createStandardAction(SET_MENTOR_PK)<number>(),
  resetHtUser: createStandardAction(RESET_HT_USER)(),
  resetStatus: createStandardAction(REST_STATUS)(),
  getHtUser: createStandardAction(GET_HT_USER)<string>(),
};

export type hanseithonReducerActions =
  | Deem
  | Modal
  | Agree
  | SetTeamPk
  | GetTeam
  | GetTeamSuccess
  | GetTeamFailure
  | PostTeam
  | PostTeamSuccess
  | PostTeamFailure
  | PutTeam
  | PutTeamSuccess
  | PutTeamFailure
  | GetTeamMatch
  | GetTeamMatchSuccess
  | GetTeamMatchFailure
  | PostTeamMatch
  | PostTeamMatchSuccess
  | PostTeamMatchFailure
  | PostObserver
  | PostObserverSuccess
  | PostObserverFailure
  | GetTheme
  | GetThemeSuccess
  | GetThemeFailure
  | GetJudgement
  | GetJudgementSuccess
  | GetJudgementFailure
  | ResetStatus
  | GetHtUser
  | GetHtUserSuccess
  | GetHtUserFailure
  | GetMentor
  | GetMentorSuccess
  | GetMentorFailure
  | GetMentorRequest
  | GetMentorRequestSuccess
  | GetMentorRequestFailure
  | PostMentorRequest
  | PostMentorRequestSuccess
  | PostMentorRequestFailure
  | PatchMentorRequest
  | PatchMentorRequestSuccess
  | PatchMentorRequestFailure
  | SetReqPk
  | ResetHtUser
  | SetMentorPk;
