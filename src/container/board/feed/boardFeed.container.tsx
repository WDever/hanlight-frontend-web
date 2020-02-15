import BoardFeedComponent from 'components/board/feed';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  Board,
  boardActions,
  BoardApiModel,
  boardReducerActions,
  DeleteBoardParams,
  GetBoardCommentParams,
  GetBoardParams,
  LikeParams,
  OptionData,
  PatchBoardParams,
  PhotoDetailParams,
  ReportParams,
} from 'store';

type status = 'none' | 'pending' | 'success' | 'failure';

export interface BoardFeedProps {
  accessToken: string;
  board: Board[];
  boardCount: number;
  deemBoardStatus: boolean;
}

export interface BoardFeedMethod {
  getBoard: (payload: GetBoardParams) => void;
  patchBoard: (payload: PatchBoardParams) => void;
  deleteBoard: (payload: DeleteBoardParams) => void;
  like: (payload: LikeParams) => void;
  report: (payload: ReportParams) => void;
  getBoardComment: (payload: GetBoardCommentParams) => void;
  resetBoard: () => void;
  deemBoard: (payload: boolean) => void;
  activeReport(data: boolean): void;
  optionToggle(payload: OptionData): void;
  likeListToggle(payload: boolean): void;
  getLikeList(payload: LikeParams): void;
  photoDetailToggle(payload: PhotoDetailParams): void;
}

export interface BoardFeedOwnProps {
  errorCode: number;
  errorMessage: string;
  likeStatus: status;
  boardApiStatus: BoardApiModel;
}

const mapStateToProps = (
  { user, board }: AppState,
  ownProps: BoardFeedOwnProps,
) => ({
  accessToken: user.accessToken,
  board: board.board,
  boardCount: board.boardCount,
  deemBoardStatus: board.deemBoardStatus,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  getBoard: bindActionCreators(boardActions.getBoard, dispatch),
  patchBoard: bindActionCreators(boardActions.patchBoard, dispatch),
  deleteBoard: bindActionCreators(boardActions.deleteBoard, dispatch),
  like: bindActionCreators(boardActions.like, dispatch),
  report: bindActionCreators(boardActions.report, dispatch),
  getBoardComment: bindActionCreators(boardActions.getBoardCommemnt, dispatch),
  resetBoard: bindActionCreators(boardActions.resetBoard, dispatch),
  deemBoard: bindActionCreators(boardActions.deemBoard, dispatch),
  activeReport: bindActionCreators(boardActions.activeReport, dispatch),
  optionToggle: bindActionCreators(boardActions.optionToggle, dispatch),
  likeListToggle: bindActionCreators(boardActions.likeListToggle, dispatch),
  getLikeList: bindActionCreators(boardActions.getLikeList, dispatch),
  photoDetailToggle: bindActionCreators(
    boardActions.photoDetailToggle,
    dispatch,
  ),
});

const BoardFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardFeedComponent);

export default BoardFeedContainer;
