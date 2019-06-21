import * as React from 'react';

import BoardFeedComponent from 'components/board/feed';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  Board,
  boardActions,
  boardReducerActions,
  DeleteBoardParams,
  GetBoardCommentParams,
  GetBoardParams,
  LikeParams,
  PatchBoardParams,
  ReportParams,
} from 'store';

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardFeedProps {
  accessToken: string;
  boards: Board[];
  boardsCount: number;
  getBoardStatus: status;
  patchBoardStatus: status;
  deleteBoardStatus: status;
  likeStatus: status;
  reportStatus: status;
  getBoardCommentStatus: status;
}

export interface BoardFeedMethod {
  getBoard: (payload: GetBoardParams) => void;
  patchBoard: (payload: PatchBoardParams) => void;
  deleteBoard: (payload: DeleteBoardParams) => void;
  like: (payload: LikeParams) => void;
  report: (payload: ReportParams) => void;
  getBoardComment: (payload: GetBoardCommentParams) => void;
}

const mapStateToProps = ({ user, board }: AppState) => ({
  accessToken: user.accessToken,
  boards: board.boards,
  boardsCount: board.boardsCount,
  getBoardStatus: board.getBoardStatus,
  patchBoardStatus: board.patchBoardStatus,
  deleteBoardStatus: board.deleteBoardStatus,
  likeStatus: board.likeStatus,
  reportStatus: board.reportStatus,
  getBoardCommentStatus: board.getBoardCommentStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  getBoard: bindActionCreators(boardActions.getBoard, dispatch),
  patchBoard: bindActionCreators(boardActions.patchBoard, dispatch),
  deleteBoard: bindActionCreators(boardActions.deleteBoard, dispatch),
  like: bindActionCreators(boardActions.like, dispatch),
  report: bindActionCreators(boardActions.report, dispatch),
  getBoardComment: bindActionCreators(boardActions.getBoardCommemnt, dispatch),
});

const BoardFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardFeedComponent);

export default BoardFeedContainer;
