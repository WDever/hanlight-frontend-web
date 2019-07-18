import HTCurrentComponent from 'components/hanseithon/current';
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

export interface HTCurrentProps {
  accessToken: string;
  teams: TeamType[];
  getTeamStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface HTCurrentMethod {
  getTeam(payload: GetTeamParams): void;
}

export interface HTCurrentOwnProps {}

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

const HTCurrentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTCurrentComponent);

export default HTCurrentContainer;
