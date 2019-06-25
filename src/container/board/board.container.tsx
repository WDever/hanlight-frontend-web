import * as React from 'react';

import BoardComponent from 'components/board';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, Board, boardActions, boardReducerActions } from 'store';

export interface BoardProps {
  deemBoardStatus: boolean;
}

export interface BoardMethod {
  deemBoard: (payload: boolean) => void;
}

const mapStateToProps = ({ user, board }: AppState) => ({
  deemBoardStatus: board.deemBoardStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  deemBoard: bindActionCreators(boardActions.deemBoard, dispatch),
});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardComponent);

export default BoardContainer;
