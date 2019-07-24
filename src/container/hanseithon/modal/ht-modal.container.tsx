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
  errMessage: string;
  teams: TeamType[];
  team: TeamType;
}

export interface HTModalMethod {
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
  resetStatus(): void;
}

const mapStateToProps = ({ hanseithon, user, error }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
  teamPk: hanseithon.teamPk,
  errMessage: error.message,
  teams: hanseithon.teams,
  team: hanseithon.team,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
