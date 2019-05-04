import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import LoginComponent from 'components/auth/login';
import {
  AppState,
  userAcions,
  userReducerActions,
  LoginParams,
} from 'store';

export interface LoginProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface LoginMethod {
  login(data: LoginParams): void;
}

const LoginContainer: React.SFC<
LoginProps & LoginMethod & RouteComponentProps
> = ({
  login, history, match, location, loginStatus,
}) => (
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
  login: bindActionCreators(userAcions.login, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps,
  )(LoginContainer),
);
