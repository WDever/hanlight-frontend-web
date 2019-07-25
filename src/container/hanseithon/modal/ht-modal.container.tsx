import HTModalComponent from 'components/hanseithon/modal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  CategoryType,
  hanseithonActions,
  hanseithonReducerActions,
  JobType,
  MentorRequestType,
  ModalTypes,
  PostMentorRequestParams,
  PostTeamMatchParams,
  PostTeamParams,
  PutTeamParams,
  TeamType,
  userReducerActions,
  PatchMentorRequestParams,
} from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
  accessToken: string;
  teamPk: number;
  errMessage: string;
  teams: TeamType[];
  team: TeamType;
  mentorPk: number;
  reqPk: number;

  mentorRequestList: MentorRequestType[];

  postMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  patchMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface HTModalMethod {
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
  postMentorRequest(payload: PostMentorRequestParams): void;
  patchMentorRequest(payload: PatchMentorRequestParams): void;
}

const mapStateToProps = ({ hanseithon, user, error }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
  teamPk: hanseithon.teamPk,
  errMessage: error.message,
  teams: hanseithon.teams,
  team: hanseithon.team,
  mentorPk: hanseithon.mentorPk,
  postMentorRequestStatus: hanseithon.postMentorRequestStatus,
  mentorRequestList: hanseithon.mentorRequestList,
  reqPk: hanseithon.reqPk,
  patchMentorRequestStatus: hanseithon.patchMentorRequestStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
  postMentorRequest: bindActionCreators(
    hanseithonActions.postMentorRequest,
    dispatch,
  ),
  patchMentorRequest: bindActionCreators(hanseithonActions.patchMentorRequest, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
