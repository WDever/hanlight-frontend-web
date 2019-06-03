import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  userActions,
  userReducerActions,
  PwRecoveryParam,
} from 'store';
import PwRecoveryComponent from 'components/auth/recovery/pwRecovery';

export interface PwRecoveryProps {
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  fbCode: string;
  id: string;
}

export interface PwRecoveryMethod {
  pwRecovery(data: PwRecoveryParam): void;
  reset(): void;
}

const PwRecoveryContainer: React.FC<
  PwRecoveryProps & PwRecoveryMethod & RouteComponentProps
> = ({
  pwRecoveryStatus,
  pwRecovery,
  match,
  history,
  location,
  fbCode,
  id,
  reset,
}) => (
  <PwRecoveryComponent
    pwRecoveryStatus={pwRecoveryStatus}
    pwRecovery={pwRecovery}
    match={match}
    history={history}
    location={location}
    fbCode={fbCode}
    id={id}
    reset={reset}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  pwRecoveryStatus: user.pwRecoveryStatus,
  tpExistStatus: user.tpExistStatus,
  idExistStatus: user.idExistStatus,
  fbCode: user.fbCode,
  id: user.id,
});

const maptDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  idExist: bindActionCreators(userActions.idExist, dispatch),
  tpExist: bindActionCreators(userActions.tpExist, dispatch),
  pwRecovery: bindActionCreators(userActions.pwRecovery, dispatch),
  reset: bindActionCreators(userActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    maptDispatchToProps,
  )(PwRecoveryContainer),
);
