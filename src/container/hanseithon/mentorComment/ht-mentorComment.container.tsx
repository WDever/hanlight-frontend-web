import HTMentorCommentComponent from 'components/hanseithon/mentorComment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetTeamParams,
  hanseithonActions,
  hanseithonReducerActions,
  HtUserType,
  ModalTypes,
  PostMentorCommentParams,
  TeamType,
  userReducerActions,
} from 'store';

export interface HTMentorCommentProps {
  accessToken: string;
  teams: TeamType[];
  getTeamStatus: 'none' | 'pending' | 'failure' | 'success';
  postMentorCommentStatus: 'none' | 'pending' | 'success' | 'failure';
  htUserType: HtUserType;
  modalType: ModalTypes;
  errMessage: string;
}

export interface HTMentorCommentMethod {
  getTeam(payload: GetTeamParams): void;
  postMentorComment(payload: PostMentorCommentParams): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  setTeamPk(payload: number): void;
}

export interface HTMentorCommentOwnProps {}

const mapStateToProps = ({ hanseithon, user, error }: AppState) => ({
  accessToken: user.accessToken,
  teams: hanseithon.teams,
  getTeamStatus: hanseithon.getTeamStatus,
  postMentorCommentStatus: hanseithon.postMentorCommentStatus,
  htUserType: hanseithon.htUserType,
  modalType: hanseithon.modalType,
  errMessage: error.message,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  getTeam: bindActionCreators(hanseithonActions.getTeam, dispatch),
  postMentorComment: bindActionCreators(
    hanseithonActions.postMentorComment,
    dispatch,
  ),
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  setTeamPk: bindActionCreators(hanseithonActions.setTeamPk, dispatch),
});

const HTMentorCommentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTMentorCommentComponent),
);
export default HTMentorCommentContainer;
