import { Action } from 'redux';
import { ErrorResponse, HanlightMusicItem } from 'store/model';
import { createStandardAction } from 'typesafe-actions';
import { HanlightMusicTypes } from './hm.type';

export interface GetMusicPayload {
  accessToken: string;
}

export interface GetMusicSuccessPayload {
  music: HanlightMusicItem[];
}

export interface GetMusic extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC;
  payload: GetMusicPayload;
}

export interface GetMusicSuccess extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC_SUCCESS;
  payload: GetMusicSuccessPayload;
}

export interface GetMusicFailure extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC_FAILURE;
  payload: { err: ErrorResponse; origin: GetMusicPayload };
}

export interface PostMusicPayload {
  accessToken: string;
  title: string;
  album: number;
}

export interface PostMusicSuccessPayload extends PostMusicPayload {}

export interface PostMusic extends Action {
  readonly type: HanlightMusicTypes.POST_MUSIC;
  payload: PostMusicPayload;
}

export interface PostMusicSuccess extends Action {
  readonly type: HanlightMusicTypes.POST_MUSIC_SUCCESS;
  payload: PostMusicSuccessPayload;
}

export interface PostMusicFailure extends Action {
  readonly type: HanlightMusicTypes.POST_MUSIC_FAILURE;
  paylod: { err: ErrorResponse; origin: PostMusicPayload };
}

export interface GetMusicSearchPayload {
  accessToken: string;
  q: string;
  type: 'song' | 'artist' | 'album';
}

export interface GetMusicSearchSuccessPayload extends GetMusicSuccessPayload {}

export interface GetMusicSearch extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC_SEARCH;
  payload: GetMusicSearchPayload;
}

export interface GetMusicSearchSuccess extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC_SEARCH_SUCCESS;
  payload: GetMusicSearchSuccessPayload;
}

export interface GetMusicSearchFailure extends Action {
  readonly type: HanlightMusicTypes.GET_MUSIC_SEARCH_FAILURE;
  paylod: { err: ErrorResponse; origin: GetMusicSearchPayload };
}

const { GET_MUSIC, POST_MUSIC, GET_MUSIC_SEARCH } = HanlightMusicTypes;

export const hanlightMusicActions = {
  getMusic: createStandardAction(GET_MUSIC)<GetMusicPayload>(),
  postMusic: createStandardAction(POST_MUSIC)<PostMusicPayload>(),
  getMusicSearch: createStandardAction(GET_MUSIC_SEARCH)<
    GetMusicSearchPayload
  >(),
};

export type hanlightMusicReducerActions =
  | GetMusic
  | GetMusicSuccess
  | GetMusicFailure
  | PostMusic
  | PostMusicSuccess
  | PostMusicFailure
  | GetMusicSearch
  | GetMusicSearchSuccess
  | GetMusicSearchFailure;
