import MainComponent from 'components/main';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  userActions,
  userReducerActions,
  utilActions,
  utilReducerActions,
} from 'store';

export interface MainProps {
  loginStatus: 'none' | 'pending' | 'success' | 'failure';
  toggleMenuStatus: boolean;
}

export interface MainMethod {
  resetUser(): void;
  toggleMenu(payload: boolean): void;
}

const mapStateToProps = ({ user, util }: AppState) => ({
  loginStatus: user.loginStatus,
  toggleMenuStatus: util.toggleMenuStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<userReducerActions | utilReducerActions>,
) => ({
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
  toggleMenu: bindActionCreators(utilActions.toggleMenu, dispatch),
});

const MainCotainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainComponent),
);

export default MainCotainer;
