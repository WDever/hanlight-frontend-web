import { Action } from 'redux';
import { NoticeListItem, NoticePostItem } from 'store';
import { createStandardAction } from 'typesafe-actions';

export const NOTICE = 'NOTICE';
export const NOTICE_SUCCESS = 'NOTICE_SUCCESS';
export const NOTICE_FAILURE = 'NOTICE_FAILURE';
export const NOTICE_POST = 'NOTICE_POST';
export const NOTICE_POST_SUCCESS = 'NOTICE_POST_SUCCESS';
export const NOTICE_POST_FAILURE = 'NOTICE_POST_FAILURE';

export interface NoticeParams {
  accessToken: string | null;
  page?: string;
  title?: string;
}

export interface NoticePostParams {
  accessToken: string | null;
  postPk: string;
}

export interface NoticeListResType {
  success: boolean;
  data: {
    notice: NoticeListItem[];
  };
}

export interface NoticePostResType {
  success: boolean;
  data: NoticePostItem;
}

export class Notice implements Action {
  public readonly type = NOTICE;

  public constructor(public payload: NoticeParams) {}
}

export class NoticeSuccess implements Action {
  public readonly type = NOTICE_SUCCESS;

  public constructor(public payload: NoticeListResType) {}
}

export class NoticeFailure implements Action {
  public readonly type = NOTICE_FAILURE;
}

export class NoticePost implements Action {
  public readonly type = NOTICE_POST;

  public constructor(public payload: NoticePostParams) {}
}

export class NoticePostSuccess implements Action {
  public readonly type = NOTICE_POST_SUCCESS;

  public constructor(public payload: NoticePostResType) {}
}

export class NoticePostFailure implements Action {
  public readonly type = NOTICE_POST_FAILURE;
}

export const noticeActions = {
  notice: createStandardAction(NOTICE)<NoticeParams>(),
  noticePost: createStandardAction(NOTICE_POST)<NoticePostParams>(),
};

export type noticeReducerActions =
  | Notice
  | NoticeSuccess
  | NoticeFailure
  | NoticePost
  | NoticePostSuccess
  | NoticePostFailure;
