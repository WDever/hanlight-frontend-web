import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  userActions,
  userReducerActions,
  ExistParamsType,
  existReducerActions,
  existActions,
  PwRecoveryParams,
} from 'store';
import PwFindComponent from 'components/auth/pwFind';

export interface PwFindProps {
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  tpExistStatus: 'none' | 'pending' | 'success' | 'failure';
  idExistStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface PwFindMethod {
  idExist(data: string): void;
  tpExist(data: string): void;
  pwRecovery(data: PwRecoveryParams): void;
  resetExist(): void;
  resetUser(): void;
}

const PwFindContainer: React.FC<
PwFindProps & PwFindMethod & RouteComponentProps
> = ({
  pwRecoveryStatus,
  tpExistStatus,
  idExistStatus,
  idExist,
  tpExist,
  pwRecovery,
  resetExist,
  resetUser,
  match,
  history,
  location,
}) => (
  <PwFindComponent
    pwRecoveryStatus={pwRecoveryStatus}
    tpExistStatus={tpExistStatus}
    idExistStatus={idExistStatus}
    idExist={idExist}
    tpExist={tpExist}
    pwRecovery={pwRecovery}
    resetExist={resetExist}
    resetUser={resetUser}
    match={match}
    history={history}
    location={location}
  />
);

const mapStateToProps = ({ user, exist }: AppState) => ({
  pwRecoveryStatus: user.pwRecoveryStatus,
  tpExistStatus: exist.tpExistStatus,
  idExistStatus: exist.idExistStatus,
});

const maptDispatchToProps = (
  dispatch: Dispatch<userReducerActions & existReducerActions>,
) => ({
  idExist: bindActionCreators(existActions.idExist, dispatch),
  tpExist: bindActionCreators(existActions.tpExist, dispatch),
  pwRecovery: bindActionCreators(userActions.pwRecovery, dispatch),
  resetExist: bindActionCreators(existActions.reset, dispatch),
  resetUser: bindActionCreators(userActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    maptDispatchToProps,
  )(PwFindContainer),
);
