import BoardCommentComponent from 'components/board/comment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  BoardApiModel,
  boardReducerActions,
  Comment,
  DeleteBoardCommentParams,
  LikeParams,
  OptionData,
  PatchBoardCommentParams,
  ReportParams,
} from 'store';

export interface BoardCommentProps {
  accessToken: string;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  userImage: string | null;
  editCommentToggleStatus: boolean;
  optionData: OptionData;
}

export interface BoardCommentMethod {
  deleteBoardCommemnt(data: DeleteBoardCommentParams): void;
  patchBoardCommemnt(data: PatchBoardCommentParams): void;
  report(data: ReportParams): void;
  activeReport(data: boolean): void;
  editCommentToggle(data: boolean): void;
}

export interface BoardCommentOwnProps {
  comment: Comment[];
  commentCount: number;
  board_pk: number;
  board_write: boolean;
  board_userName: string | null;
  likeStatus: 'none' | 'pending' | 'success' | 'failure';
  page: number;
  deemBoard: (payload: boolean) => void;
  boardApiStatus: BoardApiModel;
  like(data: LikeParams): void;
  GetBoardComments(e: React.MouseEvent<HTMLButtonElement>): void;
  optionToggle(payload: OptionData): void;
}

const mapStateToProps = (
  { board, user }: AppState,
  ownProps: BoardCommentOwnProps,
) => ({
  accessToken: user.accessToken,
  userType: user.type,
  userImage: user.image,
  editCommentToggleStatus: board.editCommentToggleStatus,
  optionData: board.optionData,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  deleteBoardCommemnt: bindActionCreators(
    boardActions.deleteBoardComment,
    dispatch,
  ),
  patchBoardCommemnt: bindActionCreators(
    boardActions.patchBoardCommemnt,
    dispatch,
  ),
  report: bindActionCreators(boardActions.report, dispatch),
  activeReport: bindActionCreators(boardActions.activeReport, dispatch),
  editCommentToggle: bindActionCreators(
    boardActions.editCommentToggle,
    dispatch,
  ),
});

const BoardCommentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardCommentComponent);

export default BoardCommentContainer;
