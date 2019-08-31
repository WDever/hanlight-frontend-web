import { AxiosError } from 'axios';
import { Action } from 'redux';
import {
  Board,
  Comment,
  ErrorResponse,
  LikeListModel,
  OptionData,
} from 'store/model';
import { createStandardAction } from 'typesafe-actions';

export const GET_BOARD = 'GET_BOARD';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

export const POST_BOARD = 'POST_BOARD';
export const POST_BOARD_SUCCESS = 'POST_BOARD_SUCCESS';
export const POST_BOARD_FAILURE = 'POST_BOARD_FAILURE';

export const PATCH_BOARD = 'PATCH_BOARD';
export const PATCH_BOARD_SUCCESS = 'PATCH_BOARD_SUCCESS';
export const PATCH_BOARD_FAILURE = 'PATCH_BOARD_FAILURE';
export const EDIT_BOARD_TOGGLE = 'EDIT_BOARD_TOGGLE';

export const DELETE_BOARD = 'DELETE_BOARD';
export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS';
export const DELETE_BOARD_FAILURE = 'DELETE_BOARD_FAILURE';

export const GET_BOARD_COMMENT = 'GET_BOARD_COMMENT';
export const GET_BOARD_COMMENT_SUCCESS = 'GET_BOARD_COMMENT_SUCCESS';
export const GET_BOARD_COMMENT_FAILURE = 'GET_BOARD_COMMENT_FAILURE';

export const POST_BOARD_COMMENT = 'POST_BOARD_COMMENT';
export const POST_BOARD_COMMENT_SUCCESS = 'POST_BOARD_COMMENT_SUCCESS';
export const POST_BOARD_COMMENT_FAILURE = 'POST_BOARD_COMMENT_FAILURE';

export const PATCH_BOARD_COMMENT = 'PATCH_BOARD_COMMENT';
export const PATCH_BOARD_COMMENT_SUCCESS = 'PATCH_BOARD_COMMENT_SUCCESS';
export const PATCH_BOARD_COMMENT_FAILURE = 'PATCH_BOARD_COMMENT_FAILURE';
export const EDIT_COMMENT_TOGGLE = 'EDIT_COMMENT_TOGGLE';

export const DELETE_BOARD_COMMENT = 'DELETE_BOARD_COMMENT';
export const DELETE_BOARD_COMMENT_SUCCESS = 'DELETE_BOARD_COMMENT_SUCCESS';
export const DELETE_BOARD_COMMENT_FAILURE = 'DELETE_BOARD_COMMENT_FAILURE';

export const REPORT = 'REPORT';
export const REPORT_SUCCESS = 'REPORT_SUCCESS';
export const REPORT_FAILURE = 'REPORT_FAILURE';
export const ACTIVE_REPORT = 'ACTIVE_REPORT';

export const LIKE = 'LIKE';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';

export const GET_LIKE_LIST = 'GET_LIKE_LIST';
export const GET_LIKE_LIST_SUCCESS = 'GET_LIKE_LIST_SUCCESS';
export const GET_LIKE_LIST_FAILURE = 'GET_LIKE_LIST_FAILURE';
export const LIKE_LIST_TOGGLE = 'LIKE_LIST_TOGGLE';

export const PHOTO_DETAIL_TOGGLE = 'PHOTO_DETAIL_TOGGLE';

export const OPTION_TOGGLE = 'OPTION_TOGGLE';

export const DEEM_BOARD = 'DEEM_BOARD';

export const RESET_BOARD = 'RESET_BOARD';

export interface GetBoardParams {
  accessToken: string;
  page?: number;
}

export interface PostBoardParams {
  accessToken: string;
  content: string;
  files?: File[];
  anonymous?: boolean;
}

export interface PatchBoardParams {
  accessToken: string;
  content: string;
  board_pk: number;
}

export interface DeleteBoardParams {
  accessToken: string;
  board_pk: number;
}

export interface GetBoardCommentParams {
  accessToken: string;
  board_pk: number;
  page?: number;
}

export interface PostBoardCommentParams {
  accessToken: string;
  content: string;
  board_pk: number;
}

export interface PatchBoardCommentParams {
  accessToken: string;
  content: string;
  board_pk: number;
  comment_pk: number;
}

export interface DeleteBoardCommentParams {
  accessToken: string;
  board_pk: number;
  comment_pk: number;
}

export interface LikeParams {
  accessToken: string;
  type: 'board' | 'comment';
  board_pk: number;
  comment_pk?: number;
}

export interface ReportParams {
  accessToken: string;
  type: 'board' | 'comment';
  board_pk: number;
  comment_pk?: number;
  content?: string;
}

export interface PhotoDetailParams {
  status: boolean;
  board_pk: number;
  idx: number;
}

export interface GetLikeListResType {
  like: LikeListModel[];
}

export class GetBoard implements Action {
  public readonly type = GET_BOARD;

  public constructor(public payload: GetBoardParams) {}
}

export class GetBoardSuccess implements Action {
  public readonly type = GET_BOARD_SUCCESS;

  public constructor(public payload: { board: Board[]; resultCount: number }) {}
}

export class GetBoardFailure implements Action {
  public readonly type = GET_BOARD_FAILURE;

  public constructor(
    public payload: { err: AxiosError<ErrorResponse>; origin: GetBoardParams },
  ) {}
}

export class PostBoard implements Action {
  public readonly type = POST_BOARD;

  public constructor(public payload: PostBoardParams) {}
}

export class PostBoardSuccess implements Action {
  public readonly type = POST_BOARD_SUCCESS;

  public constructor(
    public payload: {
      pk: number;
      user_name: string;
      user_image: string;
      content: string;
      files: string[];
      createdAt: string;
    },
  ) {}
}

export class PostBoardFailure implements Action {
  public readonly type = POST_BOARD_FAILURE;

  public constructor(
    public payload: { err: AxiosError<ErrorResponse>; origin: PostBoardParams },
  ) {}
}

export class PatchBoard implements Action {
  public readonly type = PATCH_BOARD;

  public constructor(public payload: PatchBoardParams) {}
}

export class PatchBoardSuccess implements Action {
  public readonly type = PATCH_BOARD_SUCCESS;

  public constructor(
    public payload: {
      pk: number;
      user_name: string;
      content: string;
      files: string[];
      createdAt: string;
    },
  ) {}
}

export class PatchBoardFailure implements Action {
  public readonly type = PATCH_BOARD_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: PatchBoardParams;
    },
  ) {}
}

export class EditBoardToggle implements Action {
  public readonly type = EDIT_BOARD_TOGGLE;

  public constructor(public payload: boolean) {}
}

export class DeleteBoard implements Action {
  public readonly type = DELETE_BOARD;

  public constructor(public payload: DeleteBoardParams) {}
}

export class DeleteBoardSuccess implements Action {
  public readonly type = DELETE_BOARD_SUCCESS;

  public constructor(public payload: DeleteBoardParams) {}
}

export class DeleteBoardFailure implements Action {
  public readonly type = DELETE_BOARD_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: DeleteBoardParams;
    },
  ) {}
}

export class GetBoardComment implements Action {
  public readonly type = GET_BOARD_COMMENT;

  public constructor(public payload: GetBoardCommentParams) {}
}

export class GetBoardCommentSuccess implements Action {
  public readonly type = GET_BOARD_COMMENT_SUCCESS;

  public constructor(
    public payload: {
      comment: Comment[];
      resultCount: number;
      board_pk: number;
    },
  ) {}
}

export class GetBoardCommentFailure implements Action {
  public readonly type = GET_BOARD_COMMENT_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: GetBoardCommentParams;
    },
  ) {}
}

export class PostBoardComment implements Action {
  public readonly type = POST_BOARD_COMMENT;

  public constructor(public payload: PostBoardCommentParams) {}
}

export class PostBoardCommentSuccess implements Action {
  public readonly type = POST_BOARD_COMMENT_SUCCESS;

  public constructor(public payload: { comment: Comment; board_pk: number }) {}
}

export class PostBoardCommentFailure implements Action {
  public readonly type = POST_BOARD_COMMENT_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: PostBoardCommentParams;
    },
  ) {}
}

export class PatchBoardComment implements Action {
  public readonly type = PATCH_BOARD_COMMENT;

  public constructor(public payload: PatchBoardCommentParams) {}
}

export class PatchBoardCommentSuccess implements Action {
  public readonly type = PATCH_BOARD_COMMENT_SUCCESS;

  public constructor(
    public payload: Comment,
    public meta: { board_pk: number },
  ) {}
}

export class EditCommentToggle implements Action {
  public readonly type = EDIT_COMMENT_TOGGLE;

  public constructor(public payload: boolean) {}
}

export class PatchBoardCommentFailure implements Action {
  public readonly type = PATCH_BOARD_COMMENT_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: PatchBoardCommentParams;
    },
  ) {}
}

export class DeleteBoardComment implements Action {
  public readonly type = DELETE_BOARD_COMMENT;

  public constructor(public payload: DeleteBoardCommentParams) {}
}

export class DeleteBoardCommentSuccess implements Action {
  public readonly type = DELETE_BOARD_COMMENT_SUCCESS;

  public constructor(public payload: DeleteBoardCommentParams) {}
}

export class DeleteBoardCommentFailure implements Action {
  public readonly type = DELETE_BOARD_COMMENT_FAILURE;

  public constructor(
    public payload: {
      err: AxiosError<ErrorResponse>;
      origin: DeleteBoardCommentParams;
    },
  ) {}
}

export class Report implements Action {
  public readonly type = REPORT;

  public constructor(public payload: ReportParams) {}
}

export class ReportSuccess implements Action {
  public readonly type = REPORT_SUCCESS;
}

export class ReportFailure implements Action {
  public readonly type = REPORT_FAILURE;

  public constructor(
    public payload: { err: AxiosError<ErrorResponse>; origin: ReportParams },
  ) {}
}

export class ActiveReport implements Action {
  public readonly type = ACTIVE_REPORT;

  public constructor(public payload: boolean) {}
}

export class Like implements Action {
  public readonly type = LIKE;

  public constructor(public payload: LikeParams) {}
}

export class LikeSuccess implements Action {
  public readonly type = LIKE_SUCCESS;

  public constructor(public payload: LikeParams) {}
}

export class LikeFailure implements Action {
  public readonly type = LIKE_FAILURE;

  public constructor(
    public payload: { err: AxiosError<ErrorResponse>; origin: LikeParams },
  ) {}
}

export class GetLikeList implements Action {
  public readonly type = GET_LIKE_LIST;

  public constructor(public payload: LikeParams) {}
}

export class GetLikeListSuccess implements Action {
  public readonly type = GET_LIKE_LIST_SUCCESS;

  public constructor(public payload: GetLikeListResType) {}
}

export class GetLikeListFailure implements Action {
  public readonly type = GET_LIKE_LIST_FAILURE;

  public constructor(public payload: ErrorResponse) {}
}

export class LikeListToggle implements Action {
  public readonly type = LIKE_LIST_TOGGLE;

  public constructor(public payload: boolean) {}
}

export class PhotoDetailToggle implements Action {
  public readonly type = PHOTO_DETAIL_TOGGLE;

  public constructor(public payload: PhotoDetailParams) {}
}

export class OptionToggle implements Action {
  public readonly type = OPTION_TOGGLE;

  public constructor(public payload: OptionData) {}
}

export class DeemBoard implements Action {
  public readonly type = DEEM_BOARD;

  public constructor(public payload: boolean) {}
}

export class ResetBoard implements Action {
  public readonly type = RESET_BOARD;
}

export const boardActions = {
  getBoard: createStandardAction(GET_BOARD)<GetBoardParams>(),
  postBoard: createStandardAction(POST_BOARD)<PostBoardParams>(),
  patchBoard: createStandardAction(PATCH_BOARD)<PatchBoardParams>(),
  editBoardToggle: createStandardAction(EDIT_BOARD_TOGGLE)<boolean>(),
  deleteBoard: createStandardAction(DELETE_BOARD)<DeleteBoardParams>(),
  getBoardCommemnt: createStandardAction(GET_BOARD_COMMENT)<
    GetBoardCommentParams
  >(),
  postBoardCommemnt: createStandardAction(POST_BOARD_COMMENT)<
    PostBoardCommentParams
  >(),
  patchBoardCommemnt: createStandardAction(PATCH_BOARD_COMMENT)<
    PatchBoardCommentParams
  >(),
  editCommentToggle: createStandardAction(EDIT_COMMENT_TOGGLE)<boolean>(),
  deleteBoardComment: createStandardAction(DELETE_BOARD_COMMENT)<
    DeleteBoardCommentParams
  >(),
  report: createStandardAction(REPORT)<ReportParams>(),
  activeReport: createStandardAction(ACTIVE_REPORT)<boolean>(),
  like: createStandardAction(LIKE)<LikeParams>(),
  getLikeList: createStandardAction(GET_LIKE_LIST)<LikeParams>(),
  likeListToggle: createStandardAction(LIKE_LIST_TOGGLE)<boolean>(),
  photoDetailToggle: createStandardAction(PHOTO_DETAIL_TOGGLE)<
    PhotoDetailParams
  >(),
  optionToggle: createStandardAction(OPTION_TOGGLE)<OptionData>(),
  deemBoard: createStandardAction(DEEM_BOARD)<boolean>(),
  resetBoard: createStandardAction(RESET_BOARD)(),
};

export type boardReducerActions =
  | GetBoard
  | GetBoardSuccess
  | GetBoardFailure
  | PostBoard
  | PostBoardSuccess
  | PostBoardFailure
  | PatchBoard
  | PatchBoardSuccess
  | PatchBoardFailure
  | EditBoardToggle
  | DeleteBoard
  | DeleteBoardSuccess
  | DeleteBoardFailure
  | GetBoardComment
  | GetBoardCommentSuccess
  | GetBoardCommentFailure
  | PostBoardComment
  | PostBoardCommentSuccess
  | PostBoardCommentFailure
  | PatchBoardComment
  | PatchBoardCommentSuccess
  | PatchBoardCommentFailure
  | EditCommentToggle
  | DeleteBoardComment
  | DeleteBoardCommentSuccess
  | DeleteBoardCommentFailure
  | Report
  | ReportSuccess
  | ReportFailure
  | ActiveReport
  | Like
  | LikeSuccess
  | LikeFailure
  | GetLikeList
  | GetLikeListSuccess
  | GetLikeListFailure
  | LikeListToggle
  | PhotoDetailToggle
  | OptionToggle
  | DeemBoard
  | ResetBoard;
