import * as React from 'react';

import BoardFormComponent from 'components/board/detail-board/form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  PostBoardParams,
} from 'store';

export interface BoardFormProps {
  accessToken: string;
  postBoardStatus: 'none' | 'pending' | 'success' | 'failure';
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  userImage: string | null;
}

export interface BoardFormMethod {
  postBoard: ({ accessToken, content, files }: PostBoardParams) => void;
}

const mapStateToProps = ({ user, board, error }: AppState) => ({
  accessToken: user.accessToken,
  postBoardStatus: board.postBoardStatus,
  userType: user.type,
  userImage: user.image,
  errorCode: error.code,
  errorMessage: error.message,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  postBoard: bindActionCreators(boardActions.postBoard, dispatch),
});

const BoardFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardFormComponent);

export default BoardFormContainer;
