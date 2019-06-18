import produce from 'immer';
import { boardReducerActions } from 'store/action/board.action';
import { BoardModel } from 'store/model';

const initialState: BoardModel = {
  boards: [],
  getBoardStatus: 'none',
  postBoardStatus: 'none',
  patchBoardStatus: 'none',
  deleteBoardStatus: 'none',
  getBoardCommentStatus: 'none',
  postBoardCommentStatus: 'none',
  patchBoardCommentStatus: 'none',
  deleteBoardCommentStatus: 'none',
  reportStatus: 'none',
  likeStatus: 'none',
};

export const boardReducer = (
  state: BoardModel = initialState,
  action: boardReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_BOARD':
        draft.getBoardStatus = 'pending';
        break;
      case 'GET_BOARD_SUCCESS':
        draft.getBoardStatus = 'success';
        break;
      case 'GET_BOARD_FAILURE':
        draft.getBoardStatus = 'failure';
        break;

      case 'POST_BOARD':
        draft.postBoardStatus = 'pending';
        break;
      case 'POST_BOARD_SUCCESS':
        draft.postBoardStatus = 'success';
        draft.boards.unshift({
          ...action.payload,
          edited: false,
          commentCount: 0,
          comment: [],
        });
        break;
      case 'POST_BOARD_FAILURE':
        draft.postBoardStatus = 'failure';
        break;

      case 'PATCH_BOARD':
        draft.patchBoardStatus = 'pending';
        break;
      case 'PATCH_BOARD_SUCCESS':
        draft.patchBoardStatus = 'success';
        break;
      case 'PATCH_BOARD_FAILURE':
        draft.patchBoardStatus = 'failure';
        break;

      case 'DELETE_BOARD':
        draft.deleteBoardStatus = 'pending';
        break;
      case 'DELETE_BOARD_SUCCESS':
        draft.deleteBoardStatus = 'success';
        break;
      case 'DELETE_BOARD_FAILURE':
        draft.deleteBoardStatus = 'failure';
        break;

      case 'GET_BOARD_COMMENT':
        draft.getBoardCommentStatus = 'pending';
        break;
      case 'GET_BOARD_COMMENT_SUCCESS':
        draft.getBoardCommentStatus = 'success';
        break;
      case 'GET_BOARD_COMMENT_FAILURE':
        draft.getBoardCommentStatus = 'failure';
        break;

      case 'POST_BOARD_COMMENT':
        draft.postBoardCommentStatus = 'pending';
        break;
      case 'POST_BOARD_COMMENT_SUCCESS':
        draft.postBoardCommentStatus = 'success';
        break;
      case 'POST_BOARD_COMMENT_FAILURE':
        draft.postBoardCommentStatus = 'failure';
        break;

      case 'PATCH_BOARD_COMMENT':
        draft.patchBoardCommentStatus = 'pending';
        break;
      case 'PATCH_BOARD_COMMENT_SUCCESS':
        draft.patchBoardCommentStatus = 'success';
        break;
      case 'PATCH_BOARD_COMMENT_FAILURE':
        draft.patchBoardCommentStatus = 'failure';
        break;

      case 'DELETE_BOARD_COMMENT':
        draft.deleteBoardCommentStatus = 'pending';
        break;
      case 'DELETE_BOARD_COMMENT_SUCCESS':
        draft.deleteBoardCommentStatus = 'success';
        break;
      case 'DELETE_BOARD_COMMENT_FAILURE':
        draft.deleteBoardCommentStatus = 'failure';
        break;

      case 'REPORT':
        draft.reportStatus = 'pending';
        break;
      case 'REPORT_SUCCESS':
        draft.reportStatus = 'success';
        break;
      case 'REPORT_FAILURE':
        draft.reportStatus = 'failure';
        break;

      case 'LIKE':
        draft.likeStatus = 'pending';
        break;
      case 'LIKE_SUCCESS':
        draft.likeStatus = 'success';
        break;
      case 'LIKE_FAILURE':
        draft.likeStatus = 'failure';
        break;

      default:
        break;
    }
  });
