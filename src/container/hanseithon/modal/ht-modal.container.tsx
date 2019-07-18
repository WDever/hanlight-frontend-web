import HTModalComponent from 'components/hanseithon/modal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  CategoryType,
  hanseithonActions,
  hanseithonReducerActions,
  JobType,
  ModalTypes,
  PostTeamMatchParams,
  PostTeamParams,
  PutTeamParams,
  TeamType,
  userReducerActions,
} from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
  accessToken: string;
  teamPk: number;
  putTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamMatchStatus: 'none' | 'pending' | 'success' | 'failure';
  errMessage: string;
  teams: TeamType[];
  team: TeamType;
}

export interface HTModalMethod {
  postTeam(payload: PostTeamParams): void;
  putTeam(payload: PutTeamParams): void;
  postTeamMatch(payload: PostTeamMatchParams): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
}

const mapStateToProps = ({ hanseithon, user, error }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
  teamPk: hanseithon.teamPk,
  putTeamStatus: hanseithon.putTeamStatus,
  postTeamStatus: hanseithon.postTeamStatus,
  postTeamMatchStatus: hanseithon.postTeamMatchStatus,
  errMessage: error.message,
  teams: hanseithon.teams,
  team: hanseithon.team,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  postTeam: bindActionCreators(hanseithonActions.postTeam, dispatch),
  putTeam: bindActionCreators(hanseithonActions.putTeam, dispatch),
  postTeamMatch: bindActionCreators(hanseithonActions.postTeamMatch, dispatch),
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
