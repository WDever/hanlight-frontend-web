import { Action } from 'redux';
import { Notice } from 'store';
import { createStandardAction } from 'typesafe-actions';

export const GET_NOTICE_LIST = 'GET_NOTICE_LIST';
export const GET_NOTICE_LIST_SUCCESS = 'GET_NOTICE_LIST_SUCCESS';
export const GET_NOTICE_LIST_FAILURE = 'GET_NOTICE_LIST_FAILURE';
export const GET_NOTICE_POST = 'GET_NOTICE_POST';
export const GET_NOTICE_POST_SUCCESS = 'GET_NOTICE_POST_SUCCESS';
export const GET_NOTICE_POST_FAILURE = 'GET_NOTICE_POST_FAILURE';

export interface GetNoticeListParams {
  accessToken: string | null;
  page?: number;
  title?: string;
}

export interface GetNoticePostParams {
  accessToken: string | null;
  postPk: string;
}

export interface GetNoticeListResType {
  success: boolean;
  data: {
    notice: Notice[];
    resultCount: number;
  };
}

export interface GetNoticePostResType {
  success: boolean;
  data: Notice;
}

export class GetNoticeList implements Action {
  public readonly type = GET_NOTICE_LIST;

  public constructor(public payload: GetNoticeListParams) {}
}

export class GetNoticeListSuccess implements Action {
  public readonly type = GET_NOTICE_LIST_SUCCESS;

  public constructor(public payload: GetNoticeListResType) {}
}

export class GetNoticeListFailure implements Action {
  public readonly type = GET_NOTICE_LIST_FAILURE;
}

export class GetNoticePost implements Action {
  public readonly type = GET_NOTICE_POST;

  public constructor(public payload: GetNoticePostParams) {}
}

export class GetNoticePostSuccess implements Action {
  public readonly type = GET_NOTICE_POST_SUCCESS;

  public constructor(public payload: GetNoticePostResType) {}
}

export class GetNoticePostFailure implements Action {
  public readonly type = GET_NOTICE_POST_FAILURE;
}

export const noticeActions = {
  getNoticeList: createStandardAction(GET_NOTICE_LIST)<GetNoticeListParams>(),
  getNoticePost: createStandardAction(GET_NOTICE_POST)<GetNoticePostParams>(),
};

export type noticeReducerActions =
  | GetNoticeList
  | GetNoticeListSuccess
  | GetNoticeListFailure
  | GetNoticePost
  | GetNoticePostSuccess
  | GetNoticePostFailure;
