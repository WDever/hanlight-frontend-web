export interface Comment {
  pk: number;
  user_name: string;
  content: string;
  createdAt: string;
  edited: boolean;
  isLiked: boolean;
  likeCount: number;
  write: boolean;
}

export interface Board {
  pk: number;
  user_name: string;
  content: string;
  files: string[];
  createdAt: string;
  edited: boolean;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  comment: Comment[];
  write: boolean;
}

export interface ReportData {
  type: 'none' | 'board' | 'comment';
  board_pk: number;
  comment_pk?: number;
  active: boolean;
}

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardModel {
  board: Board[];
  boardCount: number;
  getBoardStatus: status;
  postBoardStatus: status;
  patchBoardStatus: status;
  deleteBoardStatus: status;
  getBoardCommentStatus: status;
  postBoardCommentStatus: status;
  patchBoardCommentStatus: status;
  deleteBoardCommentStatus: status;
  reportStatus:
    | 'none'
    | 'pending'
    | 'success-board'
    | 'success-comment'
    | 'failure-board'
    | 'failure-comment';
  likeStatus: status;
  deemBoardStatus: boolean;
  reportData: ReportData;
}
