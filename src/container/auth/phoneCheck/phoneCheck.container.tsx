import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import PhoneCheckComponent from 'components/auth/phoneCheck';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppState,
  ExistParamsType,
  VerifyPhoneParams,
  registerReducerActions,
  registerActions,
  existReducerActions,
  existActions,
} from 'store';

export interface PhoneCheckProps {
  verifyStatus: 'none' | 'pending' | 'success' | 'failure';
  signKeyExistStatus: 'none' | 'pending' | 'success' | 'failure';
  tpExistStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface PhoneCheckMethod {
  tpExist(data: string): void;
  signKeyExist(data: string): void;
  verifyPhone(data: VerifyPhoneParams): void;
  setSignKey(data: string): void;
  resetExist(): void;
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
  resetExist,
}) => (
  <PhoneCheckComponent
    tpExist={tpExist}
    signKeyExist={signKeyExist}
    history={history}
    match={match}
    location={location}
    verifyPhone={verifyPhone}
    verifyStatus={verifyStatus}
    signKeyExistStatus={signKeyExistStatus}
    tpExistStatus={tpExistStatus}
    setSignKey={setSignKey}
    resetExist={resetExist}
  />
);

const mapStateToProps = ({ register, exist }: AppState) => ({
  verifyStatus: register.verifyStatus,
  tpExistStatus: exist.tpExistStatus,
  signKeyExistStatus: exist.signKeyExistStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<registerReducerActions & existReducerActions>) => ({
  tpExist: bindActionCreators(existActions.tpExist, dispatch),
  signKeyExist: bindActionCreators(existActions.signKeyExist, dispatch),
  verifyPhone: bindActionCreators(registerActions.verifyPhone, dispatch),
  setSignKey: bindActionCreators(registerActions.setSignKey, dispatch),
  resetExist: bindActionCreators(existActions.reset, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PhoneCheckContainer),
);
