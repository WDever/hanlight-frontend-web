import HTCurrentComponent from 'components/hanseithon/current';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetTeamParams,
  hanseithonActions,
  hanseithonReducerActions,
  ModalTypes,
  TeamType,
  userReducerActions,
} from 'store';

export interface HTCurrentProps {
  accessToken: string;
  teams: TeamType[];
  getTeamStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface HTCurrentMethod {
  getTeam(payload: GetTeamParams): void;
  modal(payload: ModalTypes): void;
  setTeamPk(payload: number): void;
}

export interface HTCurrentOwnProps {
  isModal: boolean;
}

const mapStateToProps = ({ hanseithon, user }: AppState, ownProps: HTCurrentOwnProps) => ({
  accessToken: user.accessToken,
  teams: hanseithon.teams,
  getTeamStatus: hanseithon.getTeamStatus,
  ...ownProps
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  getTeam: bindActionCreators(hanseithonActions.getTeam, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  setTeamPk: bindActionCreators(hanseithonActions.setTeamPk, dispatch),
});

const HTCurrentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTCurrentComponent);

export default HTCurrentContainer;
