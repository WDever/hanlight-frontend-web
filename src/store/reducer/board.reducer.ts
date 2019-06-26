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
  deemBoardStatus: false,
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
      case 'PATCH_BOARD_SUCCESS': {
        draft.patchBoardStatus = 'success';
        const boardIndex = draft.board.findIndex(
          board => board.pk === action.payload.pk,
        );
        draft.board[boardIndex] = {
          ...draft.board[boardIndex],
          ...action.payload,
          edited: true,
        };
        break;
      }
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
        board.comment.unshift({
          ...action.payload.comment,
          edited: false,
          likeCount: 0,
          isLiked: false,
          write: true,
        });
        board.commentCount += 1;
        break;
      }
      case 'POST_BOARD_COMMENT_FAILURE':
        draft.postBoardCommentStatus = 'failure';
        break;

      case 'PATCH_BOARD_COMMENT':
        draft.patchBoardCommentStatus = 'pending';
        break;
      case 'PATCH_BOARD_COMMENT_SUCCESS': {
        draft.patchBoardCommentStatus = 'success';
        const board = draft.board.find(
          board => board.pk === action.meta.board_pk,
        );
        const comment =
          board &&
          board.comment.find(comment => comment.pk === action.payload.pk);
        Object.assign(comment, {
          ...action.payload,
          edited: true,
        });
        break;
      }
      case 'PATCH_BOARD_COMMENT_FAILURE':
        draft.patchBoardCommentStatus = 'failure';
        break;

      case 'DELETE_BOARD_COMMENT':
        draft.deleteBoardCommentStatus = 'pending';
        break;
      case 'DELETE_BOARD_COMMENT_SUCCESS': {
        draft.deleteBoardCommentStatus = 'success';
        const board =
          draft.board[
            draft.board.findIndex(board => board.pk === action.payload.board_pk)
          ];
        board.commentCount -= 1;
        board.comment = board.comment.filter(
          item => item.pk !== action.payload.comment_pk,
        );
        break;
      }
      case 'DELETE_BOARD_COMMENT_FAILURE':
        draft.deleteBoardCommentStatus = 'failure';
        break;

      case 'REPORT':
        draft.reportStatus = 'pending';
        break;
      case 'REPORT_BOARD_SUCCESS':
        draft.reportStatus = 'success-board';
        break;
      case 'REPORT_BOARD_FAILURE':
        draft.reportStatus = 'failure-board';
        break;
      case 'REPORT_COMMENT_SUCCESS':
        draft.reportStatus = 'success-comment';
        break;
      case 'REPORT_COMMENT_FAILURE':
        draft.reportStatus = 'failure-comment';
        break;

      case 'LIKE':
        draft.likeStatus = 'pending';
        break;
      case 'LIKE_SUCCESS':
        {
          draft.likeStatus = 'success';
          const board = draft.board.find(
            board => board.pk === action.payload.board_pk,
          );

          if (action.payload.type === 'board' && board) {
            if (board.isLiked) {
              board.likeCount -= 1;
            } else {
              board.likeCount += 1;
            }
            board.isLiked = !board.isLiked;
          } else if (action.payload.type === 'comment' && board) {
            const comment = board.comment.find(
              comment => comment.pk === action.payload.comment_pk,
            );

            if (comment) {
              if (comment.isLiked) {
                comment.likeCount -= 1;
              } else {
                comment.likeCount += 1;
              }
              comment.isLiked = !comment.isLiked;
            }
          }
        }
        break;
      case 'LIKE_FAILURE':
        draft.likeStatus = 'failure';
        break;

      case 'DEEM_BOARD':
        draft.deemBoardStatus = action.payload;
        break;
      case 'RESET_BOARD':
        return initialState;

      default:
        break;
    }
  });
