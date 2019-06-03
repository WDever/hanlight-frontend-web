import MainComponent from 'components/main';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userActions, userReducerActions } from 'store';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface MainMethod {
  reset(): void;
}

const MainContainer: React.FC<MainProps & MainMethod & RouteComponentProps> = ({
  location,
  loginStatus,
  match,
  history,
  reset,
}) => (
  <MainComponent
    loginStatus={loginStatus}
    history={history}
    location={location}
    match={match}
    reset={reset}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  loginStatus: user.loginStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  reset: bindActionCreators(userActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainContainer),
);
