export interface Comment {
  pk: number;
  user_name: string;
  content: string;
  createdAt: string;
  edited: boolean;
}

export interface Board {
  pk: number;
  user_name: string;
  content: string;
  files: string[];
  createdAt: string;
  edited: boolean;
  commentCount: number;
  comment: Comment[];
}

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardModel {
  boards: Board[];
  boardsCount: number;
  getBoardStatus: status;
  postBoardStatus: status;
  patchBoardStatus: status;
  deleteBoardStatus: status;
  getBoardCommentStatus: status;
  postBoardCommentStatus: status;
  patchBoardCommentStatus: status;
  deleteBoardCommentStatus: status;
  reportStatus: status;
  likeStatus: status;
}
