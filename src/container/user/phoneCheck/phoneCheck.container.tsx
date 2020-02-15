import * as React from 'react';

import PhoneCheckComponent from 'components/user/phoneCheck';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  errorActions,
  IdRecoveryParam,
  PwRecoveryParam,
  userActions,
  userReducerActions,
  VerifyPhoneParam,
} from 'store';

export interface PhoneCheckProps {
  verifyPhoneStatus: 'none' | 'pending' | 'success' | 'failure';
  idRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  pwRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  recoveryId: string;
  errorName: string;
  errorMessage: string;
}

export interface PhoneCheckMethod {
  setSignKey(data: string): void;
  verifyPhone(data: VerifyPhoneParam): void;
  idRecovery(data: IdRecoveryParam): void;
  pwRecovery(data: PwRecoveryParam): void;
  resetUser(): void;
  resetError(): void;
}

const PhoneCheckContainer: React.SFC<PhoneCheckProps &
  PhoneCheckMethod &
  RouteComponentProps> = ({
  verifyPhone,
  verifyPhoneStatus,
  history,
  match,
  location,
  resetUser,
  idRecovery,
  idRecoveryStatus,
  pwRecovery,
  pwRecoveryStatus,
  recoveryId,
  setSignKey,
  errorName,
  errorMessage,
  resetError,
}) => (
  <PhoneCheckComponent
    history={history}
    match={match}
    location={location}
    verifyPhone={verifyPhone}
    verifyPhoneStatus={verifyPhoneStatus}
    resetUser={resetUser}
    idRecovery={idRecovery}
    idRecoveryStatus={idRecoveryStatus}
    pwRecovery={pwRecovery}
    pwRecoveryStatus={pwRecoveryStatus}
    recoveryId={recoveryId}
    setSignKey={setSignKey}
    errorName={errorName}
    errorMessage={errorMessage}
    resetError={resetError}
  />
);

const mapStateToProps = ({ user, error }: AppState) => ({
  verifyPhoneStatus: user.verifyPhoneStatus,
  idExistStatus: user.idExistStatus,
  idRecoveryStatus: user.idRecoveryStatus,
  recoveryId: user.id,
  pwRecoveryStatus: user.pwRecoveryStatus,
  errorName: error.name,
  errorMessage: error.message,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  idExist: bindActionCreators(userActions.idExist, dispatch),
  verifyPhone: bindActionCreators(userActions.verifyPhone, dispatch),
  setSignKey: bindActionCreators(userActions.setSignKey, dispatch),
  resetUser: bindActionCreators(userActions.resetUser, dispatch),
  idRecovery: bindActionCreators(userActions.idRecovery, dispatch),
  pwRecovery: bindActionCreators(userActions.pwRecovery, dispatch),
  resetError: bindActionCreators(errorActions.resetError, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhoneCheckContainer),
);
