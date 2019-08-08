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
  getLikeListStatus: 'none',
  reportStatus: 'none',
  likeStatus: 'none',
  deemBoardStatus: false,
  activeReportData: {
    active: false,
    type: 'none',
    board_pk: 0,
  },
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          alert('존재하지 않는 게시글 입니다.');
          draft.board.splice(
            draft.board.findIndex(
              board => board.pk === action.payload.origin.board_pk,
            ),
            1,
          );
        }
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          alert('존재하지 않는 게시글 입니다.');
          draft.board.splice(
            draft.board.findIndex(
              board => board.pk === action.payload.origin.board_pk,
            ),
            1,
          );
        }
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          alert('존재하지 않는 게시글 입니다.');
          draft.board.splice(
            draft.board.findIndex(
              board => board.pk === action.payload.origin.board_pk,
            ),
            1,
          );
        }
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          alert('존재하지 않는 댓글 입니다.');
          draft.board.splice(
            draft.board.findIndex(
              board => board.pk === action.payload.origin.board_pk,
            ),
            1,
          );
        }
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          const boardIndex = draft.board.findIndex(
            board => board.pk === action.payload.origin.board_pk,
          );
          if (action.payload.err.response.data.name === 'Not_Found_Board') {
            alert('존재하지 않는 게시글 입니다.');
            draft.board.splice(boardIndex, 1);
          } else {
            alert('존재하지 않는 댓글 입니다.');
            draft.board[boardIndex].comment.splice(
              draft.board[boardIndex].comment.findIndex(
                comment => comment.pk === action.payload.origin.comment_pk,
              ),
              1,
            );
          }
        }
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
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          const boardIndex = draft.board.findIndex(
            board => board.pk === action.payload.origin.board_pk,
          );
          if (action.payload.err.response.data.name === 'Not_Found_Board') {
            alert('존재하지 않는 게시글 입니다.');
            draft.board.splice(boardIndex, 1);
          } else {
            alert('존재하지 않는 댓글 입니다.');
            draft.board[boardIndex].comment.splice(
              draft.board[boardIndex].comment.findIndex(
                comment => comment.pk === action.payload.origin.comment_pk,
              ),
              1,
            );
          }
        }
        break;

      case 'REPORT':
        draft.reportStatus = 'pending';
        break;
      case 'REPORT_SUCCESS':
        draft.reportStatus = 'success';
        break;
      case 'REPORT_FAILURE':
        draft.reportStatus = 'failure';
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          const boardIndex = draft.board.findIndex(
            board => board.pk === action.payload.origin.board_pk,
          );
          if (action.payload.origin.comment_pk) {
            alert('존재하지 않는 댓글 입니다.');
            draft.board[boardIndex].comment.splice(
              draft.board[boardIndex].comment.findIndex(
                comment => comment.pk === action.payload.origin.comment_pk,
              ),
              1,
            );
          } else {
            alert('존재하지 않는 게시글 입니다.');
            draft.board.splice(boardIndex, 1);
          }
        }
        break;
      case 'ACTIVE_REPORT':
        draft.activeReportData = action.payload;
        break;

      case 'LIKE':
        {
          draft.likeStatus = 'pending';

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
      case 'LIKE_SUCCESS':
        draft.likeStatus = 'success';
        break;
      case 'LIKE_FAILURE':
        draft.likeStatus = 'failure';
        if (
          action.payload.err.response &&
          action.payload.err.response.data.code === 404
        ) {
          const boardIndex = draft.board.findIndex(
            board => board.pk === action.payload.origin.board_pk,
          );
          if (action.payload.origin.comment_pk) {
            alert('존재하지 않는 댓글 입니다.');
            draft.board[boardIndex].comment.splice(
              draft.board[boardIndex].comment.findIndex(
                comment => comment.pk === action.payload.origin.comment_pk,
              ),
              1,
            );
          } else {
            alert('존재하지 않는 게시글 입니다.');
            draft.board.splice(boardIndex, 1);
          }
        } else if (
          action.payload.err.response &&
          action.payload.err.response.data.code !== 404
        ) {
          const board = draft.board.find(
            board => board.pk === action.payload.origin.board_pk,
          );

          if (action.payload.origin.type === 'board' && board) {
            if (board.isLiked) {
              board.likeCount -= 1;
            } else {
              board.likeCount += 1;
            }
            board.isLiked = !board.isLiked;
          } else if (action.payload.origin.type === 'comment' && board) {
            const comment = board.comment.find(
              comment => comment.pk === action.payload.origin.comment_pk,
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

      case 'GET_LIKE_LIST':
        draft.getLikeListStatus = 'pending';
        break;

      case 'GET_LIKE_LIST_SUCCESS':
        draft.getLikeListStatus = 'success';
        console.log(action.payload);
        break;

      case 'GET_LIKE_LIST_FAILURE':
        draft.getLikeListStatus = 'failure';
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
