import * as React from 'react';
import MainComponent from 'components/main';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from 'store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
}

const MainContainer: React.FC<MainProps & RouteComponentProps> = ({
  location,
  loginStatus,
  match,
  history,
}) => (
  <MainComponent
    loginStatus={loginStatus}
    history={history}
    location={location}
    match={match}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  loginStatus: user.loginStatus,
});

export default withRouter(connect(mapStateToProps)(MainContainer));
