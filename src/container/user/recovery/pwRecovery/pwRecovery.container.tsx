import * as React from 'react';

import PwRecoveryComponent from 'components/user/recovery/pwRecovery';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, PatchPwParam, userActions, userReducerActions } from 'store';

export interface PwRecoveryProps {
  accessToken: string;
  patchPasswordStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface PwRecoveryMethod {
  patchPassword(data: PatchPwParam): void;
  resetUser(): void;
}

const PwRecoveryContainer: React.FC<PwRecoveryProps &
  PwRecoveryMethod &
  RouteComponentProps> = ({
  match,
  history,
  location,
  resetUser,
  accessToken,
  patchPassword,
  patchPasswordStatus,
}) => (
  <PwRecoveryComponent
    match={match}
    history={history}
    location={location}
    accessToken={accessToken}
    patchPassword={patchPassword}
    patchPasswordStatus={patchPasswordStatus}
    resetUser={resetUser}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  accessToken: user.accessToken,
  patchPasswordStatus: user.patchPasswordStatus,
});

const maptDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  patchPassword: bindActionCreators(userActions.patchPassword, dispatch),
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
});

export default withRouter(
  connect(mapStateToProps, maptDispatchToProps)(PwRecoveryContainer),
);
