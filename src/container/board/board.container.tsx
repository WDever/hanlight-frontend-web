import * as React from 'react';

import BoardComponent from 'components/board';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  Board,
  boardActions,
  boardReducerActions,
  errorActions,
  errorReducerActions,
} from 'store';

export interface BoardProps {
  deemBoardStatus: boolean;
}

export interface BoardMethod {
  deemBoard: (payload: boolean) => void;
  resetError: () => void;
}

const mapStateToProps = ({ user, board }: AppState) => ({
  deemBoardStatus: board.deemBoardStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<boardReducerActions & errorReducerActions>,
) => ({
  deemBoard: bindActionCreators(boardActions.deemBoard, dispatch),
  resetError: bindActionCreators(errorActions.resetError, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardComponent);

export default BoardContainer;
