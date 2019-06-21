import BoardCommentComponent from 'components/board/comment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const BoardCommentContainer = connect()(BoardCommentComponent);

export default BoardCommentContainer;
