import BoardCommentComponent from 'components/board/comment';
import CommentFormComponent from 'components/board/comment/commentForm';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  PostBoardCommentParams,
} from 'store';

export interface CommentFormProps {
  postBoardCommentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface CommentFormMethod {
  postBoardComment(data: PostBoardCommentParams): void;
}

export interface CommentFormOwnProps {
  board_pk: number;
  board_write: boolean;
  board_userName: string | null;
  accessToken: string;
  userImage: string | null;
}

const mapStateToProps = (
  { board, error }: AppState,
  ownProps: CommentFormOwnProps,
) => ({
  postBoardCommentStatus: board.postBoardCommentStatus,
  errorCode: error.code,
  errorMessage: error.message,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  postBoardComment: bindActionCreators(
    boardActions.postBoardCommemnt,
    dispatch,
  ),
});

const CommentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentFormComponent);

export default CommentFormContainer;
