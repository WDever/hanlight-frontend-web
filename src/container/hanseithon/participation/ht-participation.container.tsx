import HTParticipationComponent from 'components/hanseithon/participation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetTeamParams,
  hanseithonActions,
  hanseithonReducerActions,
  TeamType,
  userReducerActions,
} from 'store';

export interface HTParticipationProps {
  accessToken: string;
  teams: TeamType[];
  getTeamStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface HTParticipationMethod {
  getTeam(payload: GetTeamParams): void;
}

export interface HTParticipationOwnProps {}

const mapStateToProps = ({ hanseithon, user }: AppState) => ({
  accessToken: user.accessToken,
  teams: hanseithon.teams,
  getTeamStatus: hanseithon.getTeamStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  getTeam: bindActionCreators(hanseithonActions.getTeam, dispatch),
});

const HTParticipationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTParticipationComponent);

export default HTParticipationContainer;
