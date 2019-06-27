import BoardCommentComponent from 'components/board/comment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  ActiveReportData,
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
  accessToken: string;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  deleteBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
  patchBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface BoardCommentMethod {
  deleteBoardCommemnt(data: DeleteBoardCommentParams): void;
  patchBoardCommemnt(data: PatchBoardCommentParams): void;
  report(data: ReportParams): void;
  activeReport(data: ActiveReportData): void;
}

export interface BoardCommentOwnProps {
  comments: Comment[];
  commentCount: number;
  board_pk: number;
  likeStatus: 'none' | 'pending' | 'success' | 'failure';
  page: number;
  deemBoard: (payload: boolean) => void;
  like(data: LikeParams): void;
  GetBoardComments(e: React.MouseEvent<HTMLButtonElement>): void;
  setReportToggle(value: React.SetStateAction<boolean>): void;
}

const mapStateToProps = (
  { board, user }: AppState,
  ownProps: BoardCommentOwnProps,
) => ({
  accessToken: user.accessToken,
  userType: user.data.type,
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
  activeReport: bindActionCreators(boardActions.activeReport, dispatch),
});

const BoardCommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardCommentComponent);

export default BoardCommentContainer;
