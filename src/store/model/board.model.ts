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
  reportStatus: status;
  likeStatus: status;
}
