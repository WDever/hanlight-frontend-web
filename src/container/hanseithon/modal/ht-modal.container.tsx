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
  userReducerActions,
} from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
  accessToken: string;
  teamPk: number;
  putTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  postMatchTeamStatus: 'none' | 'pending' | 'success' | 'failure';
  errMessage: string;
}

export interface HTModalMethod {
  postTeam(payload: PostTeamParams): void;
  putTeam(payload: PutTeamParams): void;
  postTeamMatch(payload: PostTeamMatchParams): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
}

export interface HTModalOwnProps {}

const mapStateToProps = ({ hanseithon, user, error }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
  teamPk: hanseithon.teamPk,
  putTeamStatus: hanseithon.putTeamStatus,
  postTeamStatus: hanseithon.postTeamStatus,
  postMatchTeamStatus: hanseithon.postMatchTeamStatus,
  errMessage: error.message,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  postTeam: bindActionCreators(hanseithonActions.postTeam, dispatch),
  putTeam: bindActionCreators(hanseithonActions.putTeam, dispatch),
  postTeamMatch: bindActionCreators(hanseithonActions.postMatchTeam, dispatch),
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
