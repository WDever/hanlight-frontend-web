import BoardCommentComponent from 'components/board/comment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  Comment,
  DeleteBoardCommentParams,
  LikeParams,
  PatchBoardCommentParams,
  ReportParams,
} from 'store';

export interface BoardCommentProps {
  deleteBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
  patchBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface BoardCommentMethod {
  deleteBoardCommemnt(data: DeleteBoardCommentParams): void;
  patchBoardCommemnt(data: PatchBoardCommentParams): void;
  report(data: ReportParams): void;
}

export interface BoardCommentOwnProps {
  comments: Comment[];
  commentCount: number;
  boardPk: number;
  like(data: LikeParams): void;
}

const mapStateToProps = (
  { board }: AppState,
  ownProps: BoardCommentOwnProps,
) => ({
  deleteBoardCommentStatus: board.deleteBoardCommentStatus,
  patchBoardCommentStatus: board.patchBoardCommentStatus,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  deleteBoardCommemnt: bindActionCreators(
    boardActions.deleteBoardCommemnt,
    dispatch,
  ),
  patchBoardCommemnt: bindActionCreators(
    boardActions.patchBoardCommemnt,
    dispatch,
  ),
  report: bindActionCreators(boardActions.report, dispatch),
});

const BoardCommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardCommentComponent);

export default BoardCommentContainer;
