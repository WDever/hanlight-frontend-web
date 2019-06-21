import produce from 'immer';
import { boardReducerActions } from 'store/action/board.action';
import { BoardModel } from 'store/model';

const initialState: BoardModel = {
  board: [],
  boardCount: 0,
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
      case 'GET_BOARD': {
        draft.getBoardStatus = 'pending';
        break;
      }
      case 'GET_BOARD_SUCCESS': {
        draft.getBoardStatus = 'success';
        draft.board = draft.board.concat(
          action.payload.board.filter(
            board => draft.board.findIndex(val => val.pk === board.pk) < 0,
          ),
        );
        draft.boardCount = action.payload.resultCount;
        break;
      }
      case 'GET_BOARD_FAILURE':
        draft.getBoardStatus = 'failure';
        break;

      case 'POST_BOARD':
        draft.postBoardStatus = 'pending';
        break;
      case 'POST_BOARD_SUCCESS':
        draft.postBoardStatus = 'success';
        draft.board.unshift({
          ...action.payload,
          edited: false,
          commentCount: 0,
          isLiked: false,
          likeCount: 0,
          comment: [],
          write: true,
        });
        draft.boardCount = draft.boardCount + 1;
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
        draft.board = draft.board.filter(
          board => board.pk !== action.payload.board_pk,
        );
        break;
      case 'DELETE_BOARD_FAILURE':
        draft.deleteBoardStatus = 'failure';
        break;

      case 'GET_BOARD_COMMENT':
        draft.getBoardCommentStatus = 'pending';
        break;
      case 'GET_BOARD_COMMENT_SUCCESS': {
        draft.getBoardCommentStatus = 'success';
        const board =
          draft.board[
            draft.board.findIndex(board => board.pk === action.payload.board_pk)
          ];
        board.comment = board.comment.concat(
          action.payload.comment.filter(
            comment =>
              board.comment.findIndex(val => val.pk === comment.pk) < 0,
          ),
        );
        board.commentCount = action.payload.resultCount;
        break;
      }
      case 'GET_BOARD_COMMENT_FAILURE':
        draft.getBoardCommentStatus = 'failure';
        break;

      case 'POST_BOARD_COMMENT':
        draft.postBoardCommentStatus = 'pending';
        break;
      case 'POST_BOARD_COMMENT_SUCCESS': {
        draft.postBoardCommentStatus = 'success';
        const board =
          draft.board[
            draft.board.findIndex(board => board.pk === action.payload.board_pk)
          ];
        board.comment.unshift(action.payload.comment);
        board.commentCount += 1;
        break;
      }
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

      case 'RESET_BOARD':
        return initialState;

      default:
        break;
    }
  });
