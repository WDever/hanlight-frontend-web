import * as React from 'react';

import BoardComponent from 'components/board';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  errorActions,
  errorReducerActions,
  LikeParams,
  OptionData,
} from 'store';

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardProps {
  deemBoardStatus: boolean;
  likeStatus: status;
  reportStatus: status;
  getBoardStatus: status;
  postBoardStatus: status;
  patchBoardStatus: status;
  deleteBoardStatus: status;
  getBoardCommentStatus: status;
  postBoardCommentStatus: status;
  patchBoardCommentStatus: status;
  deleteBoardCommentStatus: status;
  getLikeListStatus: status;
  errorCode: number;
  errorMessage: string;
  optionData: OptionData;
  likeListToggleStatus: boolean;
  photoDetailDataStatus: boolean;
}

export interface BoardMethod {
  resetError: () => void;
}

const mapStateToProps = ({ board, error, user }: AppState) => ({
  deemBoardStatus: board.deemBoardStatus,
  likeStatus: board.likeStatus,
  reportStatus: board.reportStatus,
  getBoardStatus: board.getBoardStatus,
  postBoardStatus: board.postBoardStatus,
  patchBoardStatus: board.patchBoardStatus,
  deleteBoardStatus: board.deleteBoardStatus,
  getBoardCommentStatus: board.getBoardCommentStatus,
  postBoardCommentStatus: board.postBoardCommentStatus,
  patchBoardCommentStatus: board.patchBoardCommentStatus,
  deleteBoardCommentStatus: board.deleteBoardCommentStatus,
  getLikeListStatus: board.getLikeListStatus,
  errorCode: error.code,
  errorMessage: error.message,
  optionData: board.optionData,
  likeListToggleStatus: board.likeListToggleStatus,
  photoDetailDataStatus: board.photoDetailData.status,
});

const mapDispatchToProps = (
  dispatch: Dispatch<errorReducerActions | boardReducerActions>,
) => ({
  resetError: bindActionCreators(errorActions.resetError, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardComponent);

export default BoardContainer;
