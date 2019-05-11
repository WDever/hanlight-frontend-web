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
  existStatus: 'none' | 'pending' | 'success' | 'failure';
  tpExistStatus: boolean;
}

export interface PwFindMethod {
  exist(data: ExistParamsType): void;
  pwRecovery(data: PwRecoveryParams): void;
}

const PwFindContainer: React.FC<
PwFindProps & PwFindMethod & RouteComponentProps
> = ({
  pwRecoveryStatus,
  tpExistStatus,
  existStatus,
  pwRecovery,
  exist,
  match,
  history,
  location,
}) => (
  <PwFindComponent
    pwRecoveryStatus={pwRecoveryStatus}
    existStatus={existStatus}
    tpExistStatus={tpExistStatus}
    pwRecovery={pwRecovery}
    exist={exist}
    match={match}
    history={history}
    location={location}
  />
);

const mapStateToProps = ({ user, exist }: AppState) => ({
  pwRecoveryStatus: user.pwRecoveryStatus,
  tpExistStatus: exist.tpExistStatus,
  existStatus: exist.existStatus,
});

const maptDispatchToProps = (
  dispatch: Dispatch<userReducerActions & existReducerActions>,
) => ({
  exist: bindActionCreators(existActions.exist, dispatch),
  pwRecovery: bindActionCreators(userActions.pwRecovery, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    maptDispatchToProps,
  )(PwFindContainer),
);
