export interface Comment {
  pk: number;
  user_name: string;
  user_image: string;
  content: string;
  createdAt: string;
  edited: boolean;
  isLiked: boolean;
  likeCount: number;
  write: boolean;
}

export interface Board {
  pk: number;
  user_name: string | null;
  user_image: string | null;
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

export interface LikeListModel {
  user_name: string;
  user_image: string;
}

export interface OptionData {
  type: 'none' | 'board' | 'comment';
  board_pk: number;
  comment_pk?: number;
  content: string;
  write: boolean;
}

export interface PhotoDetailData {
  status: boolean;
  boardFiles: string[];
  idx: number;
}

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardApiModel {
  getBoardStatus: status;
  postBoardStatus: status;
  patchBoardStatus: status;
  deleteBoardStatus: status;
  getBoardCommentStatus: status;
  postBoardCommentStatus: status;
  patchBoardCommentStatus: status;
  deleteBoardCommentStatus: status;
  getLikeListStatus: status;
}

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
  getLikeListStatus: status;
  reportStatus: status;
  likeStatus: status;
  deemBoardStatus: boolean;
  activeReportStatus: boolean;
  optionData: OptionData;
  editBoardToggleStatus: boolean;
  editCommentToggleStatus: boolean;
  likeList: LikeListModel[];
  likeListToggleStatus: boolean;
  photoDetailData: PhotoDetailData;
}
