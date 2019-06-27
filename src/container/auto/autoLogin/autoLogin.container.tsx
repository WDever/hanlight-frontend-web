import AutoLoginComponent from 'components/auto/autoLogin';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, userActions, userReducerActions } from 'store';

export interface AutoLoginProps {
  getUserStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface AutoLoginMethod {
  getUser(data: string): void;
}

const AutoLoginContainer: React.FC<
  AutoLoginProps & AutoLoginMethod & RouteComponentProps
> = ({ history, match, location, getUser, getUserStatus }) => (
  <AutoLoginComponent
    history={history}
    match={match}
    location={location}
    getUser={getUser}
    getUserStatus={getUserStatus}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  getUserStatus: user.getUserStatus,
});

const mapDispathToProps = (dispatch: Dispatch<userReducerActions>) => ({
  getUser: bindActionCreators(userActions.getUser, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps,
  )(AutoLoginContainer),
);
