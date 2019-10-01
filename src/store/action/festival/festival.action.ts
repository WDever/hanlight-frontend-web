import { Action } from 'redux';
import {
  ErrorResponse,
  FSLolTeamModel,
  FSSingerModel,
  FSTimetableModel,
  LolModalType,
  modalType,
  PayItemType,
  SingerModalType,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';
import { GetTimetable } from '../timeTable.action';
import { FestivalTypes } from './festival.type';

export interface ToggleModalPayload {
  status: boolean;
  data?: {
    type: modalType;
    content: string | PayItemType[];
    singer?: SingerModalType;
    team?: LolModalType;
  };
}

export interface ToggleModal extends Action {
  readonly type: FestivalTypes.TOGGLE_MODAL;
  payload: ToggleModalPayload;
}

export interface GetLolTeamPayload {
  accessToken: string;
}

export interface GetLolTeamSuccessPayload {
  team: FSLolTeamModel[];
}

export interface GetLolTeam extends Action {
  readonly type: FestivalTypes.GET_LOL_TEAM;
  payload: GetLolTeamPayload;
}

export interface GetLolTeamSuccess extends Action {
  readonly type: FestivalTypes.GET_LOL_TEAM_SUCCESS;
  payload: GetLolTeamSuccessPayload;
}

export interface GetLolTeamFailure extends Action {
  readonly type: FestivalTypes.GET_LOL_TEAM_FAILURE;
  payload: { err: ErrorResponse; origin: GetLolTeamPayload };
}

export interface GetMatchPayload extends GetLolTeamPayload {}

export interface GetMatchSuccessPayload {
  match: {
    lotteryNumber: number;
  };
}

export interface GetMatch extends Action {
  readonly type: FestivalTypes.GET_MATCH;
  payload: GetMatchPayload;
}

export interface GetMatchSuccess extends Action {
  readonly type: FestivalTypes.GET_MATCH_SUCCESS;
  payload: GetMatchSuccessPayload;
}

export interface GetMatchFailure extends Action {
  readonly type: FestivalTypes.GET_MATCH_FAILURE;
  payload: { err: ErrorResponse; origin: GetMatchPayload };
}

export interface GetSingerPayload extends GetLolTeamPayload {}

export interface GetSingerSuccessPayload {
  singer: FSSingerModel[];
}

export interface GetSinger extends Action {
  readonly type: FestivalTypes.GET_SINGER;
  payload: GetSingerPayload;
}

export interface GetSingerSuccess extends Action {
  readonly type: FestivalTypes.GET_SINGER_SUCCESS;
  payload: GetSingerSuccessPayload;
}

export interface GetSingerFailure extends Action {
  readonly type: FestivalTypes.GET_SINGER_FAILURE;
  payload: { err: ErrorResponse; origin: GetSingerPayload };
}

export interface PostSingerVotePayload {
  accessToken: string;
  singerPk: number;
}

export interface PostSingerVoteSuccessPayload {
  vote: { pk: number; name: string };
}

export interface PostSingerVote extends Action {
  readonly type: FestivalTypes.POST_SINGER_VOTE;
  payload: PostSingerVotePayload;
}

export interface PostSingerVoteSuccess extends Action {
  readonly type: FestivalTypes.POST_SINGER_VOTE_SUCCESS;
  payload: PostSingerVoteSuccessPayload;
}

export interface PostSingerVoteFailure extends Action {
  readonly type: FestivalTypes.POST_SINGER_VOTE_FAILURE;
  payload: { err: ErrorResponse; origin: PostSingerVotePayload };
}

export interface PostLolVotePayload {
  accessToken: string;
  teamPk: number;
}

export interface PostLolVoteSuccessPayload {
  LOLVote: {
    team_pk: number;
    team_name: string;
  };
}

export interface PostLolVote extends Action {
  readonly type: FestivalTypes.POST_LOL_VOTE;
  payload: PostLolVotePayload;
}

export interface PostLolVoteSuccess extends Action {
  readonly type: FestivalTypes.POST_LOL_VOTE_SUCCESS;
  payload: PostLolVoteSuccessPayload;
}

export interface PostLolVoteFailure extends Action {
  readonly type: FestivalTypes.POST_LOL_VOTE_FAILURE;
  payload: { err: ErrorResponse; origin: PostLolVotePayload };
}

export interface GetFsTimetablePayload extends GetLolTeamPayload {}

export interface GetFsTimetableSuccessPayload {
  timetable: FSTimetableModel[];
}

export interface GetFsTimetable extends Action {
  readonly type: FestivalTypes.GET_FS_TIMETABLE;
  payload: GetFsTimetablePayload;
}

export interface GetFsTimetableSuccess extends Action {
  readonly type: FestivalTypes.GET_FS_TIMETABLE_SUCCESS;
  payload: GetFsTimetableSuccessPayload;
}

export interface GetFsTimetableFailure extends Action {
  readonly type: FestivalTypes.GET_FS_TIMETABLE_FAILURE;
  payload: { err: ErrorResponse; origin: GetFsTimetablePayload };
}

const {
  TOGGLE_MODAL,
  GET_LOL_TEAM,
  GET_MATCH,
  GET_SINGER,
  POST_SINGER_VOTE,
  POST_LOL_VOTE,
  GET_FS_TIMETABLE,
} = FestivalTypes;

export const festivalActions = {
  toggleModal: createStandardAction(TOGGLE_MODAL)<ToggleModalPayload>(),
  getLolTeam: createStandardAction(GET_LOL_TEAM)<GetLolTeamPayload>(),
  getMatchNumber: createStandardAction(GET_MATCH)<GetMatchPayload>(),
  getSinger: createStandardAction(GET_SINGER)<GetSingerPayload>(),
  postSingerVote: createStandardAction(POST_SINGER_VOTE)<
    PostSingerVotePayload
  >(),
  postLolVote: createStandardAction(POST_LOL_VOTE)<PostLolVotePayload>(),
  getFsTimetable: createStandardAction(GET_FS_TIMETABLE)<
    GetFsTimetablePayload
  >(),
};

export type festivalReducerActions =
  | ToggleModal
  | GetLolTeam
  | GetLolTeamSuccess
  | GetLolTeamFailure
  | GetMatch
  | GetMatchSuccess
  | GetMatchFailure
  | GetSinger
  | GetSingerSuccess
  | GetSingerFailure
  | PostSingerVote
  | PostSingerVoteSuccess
  | PostSingerVoteFailure
  | PostLolVote
  | PostLolVoteSuccess
  | PostLolVoteFailure
  | GetFsTimetable
  | GetFsTimetableSuccess
  | GetFsTimetableFailure;
