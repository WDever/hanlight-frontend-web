import LoginComponent from 'components/user/login';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, LoginParam, userActions, userReducerActions } from 'store';

export interface LoginProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface LoginMethod {
  login(data: LoginParam): void;
}

const LoginContainer: React.SFC<LoginProps &
  LoginMethod &
  RouteComponentProps> = ({ login, history, match, location, loginStatus }) => (
  <LoginComponent
    login={login}
    loginStatus={loginStatus}
    history={history}
    match={match}
    location={location}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  loginStatus: user.loginStatus,
});

const mapDispathToProps = (dispatch: Dispatch<userReducerActions>) => ({
  login: bindActionCreators(userActions.login, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(LoginContainer),
);
