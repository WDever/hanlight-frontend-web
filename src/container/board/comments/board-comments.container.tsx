import BoardCommentsComponent from 'components/board/comments';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  Board,
  boardActions,
  boardReducerActions,
  Comment,
} from 'store';

export interface BoardCommentsProps {
  comments: Comment[];
  commentCount: number;
  getBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface BoardCommentsMethod {}

export interface OwnProps {
  board_pk: number;
}

export type Props = BoardCommentsMethod & BoardCommentsProps & OwnProps;

const mapStateToProps = ({ board }: AppState, { board_pk }: OwnProps) => {
  console.log(board_pk);
  console.log(board.boards.findIndex(item => item.pk === board_pk));
  return {
  comments: board.boards[board.boards.findIndex(item => item.pk === board_pk)].comment,
  commentCount: board.boards[board.boards.findIndex(item => item.pk === board_pk)].commentCount,
  getBoardCommentStatus: board.getBoardCommentStatus,
}};

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({});

const BoardCommentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardCommentsComponent);

export default BoardCommentsContainer;
