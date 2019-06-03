import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import PhoneCheckComponent from 'components/auth/phoneCheck';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  userReducerActions,
  userActions,
  VerifyPhoneParam,
  IdRecoveryParam,
} from 'store';

export interface PhoneCheckProps {
  verifyStatus: 'none' | 'pending' | 'success' | 'failure';
  signKeyExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  tpExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  idExistStatus:
    | 'none'
    | 'pending'
    | 'success-true'
    | 'success-false'
    | 'failure';
  idRecoveryStatus: 'none' | 'pending' | 'success' | 'failure';
  recoveryId: string;
}

export interface PhoneCheckMethod {
  tpExist({ tp }: { tp: string }): void;
  signKeyExist({ signKey }: { signKey: string }): void;
  idExist({ id }: { id: string }): void;
  verifyPhone(data: VerifyPhoneParam): void;
  setSignKey(data: string): void;
  reset(): void;
  setFbCode(data: string): void;
  idRecovery(data: IdRecoveryParam): void;
  setId(data: string): void;
}

const PhoneCheckContainer: React.SFC<
  PhoneCheckProps & PhoneCheckMethod & RouteComponentProps
> = ({
  tpExist,
  signKeyExist,
  verifyPhone,
  verifyStatus,
  history,
  match,
  location,
  tpExistStatus,
  signKeyExistStatus,
  setSignKey,
  reset,
  idExistStatus,
  idExist,
  setFbCode,
  idRecovery,
  idRecoveryStatus,
  recoveryId,
  setId,
}) => (
  <PhoneCheckComponent
    tpExist={tpExist}
    signKeyExist={signKeyExist}
    idExist={idExist}
    history={history}
    match={match}
    location={location}
    verifyPhone={verifyPhone}
    verifyStatus={verifyStatus}
    signKeyExistStatus={signKeyExistStatus}
    tpExistStatus={tpExistStatus}
    setSignKey={setSignKey}
    reset={reset}
    idExistStatus={idExistStatus}
    setFbCode={setFbCode}
    idRecovery={idRecovery}
    idRecoveryStatus={idRecoveryStatus}
    recoveryId={recoveryId}
    setId={setId}
  />
);

const mapStateToProps = ({ user }: AppState) => ({
  verifyStatus: user.verifyStatus,
  tpExistStatus: user.tpExistStatus,
  signKeyExistStatus: user.signKeyExistStatus,
  idExistStatus: user.idExistStatus,
  idRecoveryStatus: user.idRecoveryStatus,
  recoveryId: user.id,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions>) => ({
  tpExist: bindActionCreators(userActions.tpExist, dispatch),
  signKeyExist: bindActionCreators(userActions.signKeyExist, dispatch),
  idExist: bindActionCreators(userActions.idExist, dispatch),
  verifyPhone: bindActionCreators(userActions.verifyPhone, dispatch),
  setSignKey: bindActionCreators(userActions.setSignKey, dispatch),
  reset: bindActionCreators(userActions.reset, dispatch),
  setFbCode: bindActionCreators(userActions.setFbCode, dispatch),
  setId: bindActionCreators(userActions.setId, dispatch),
  idRecovery: bindActionCreators(userActions.idRecovery, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PhoneCheckContainer),
);
