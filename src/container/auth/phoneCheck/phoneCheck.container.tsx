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
  existStatus: 'none' | 'pending' | 'success' | 'failure';
  signKeyExistStatus: boolean;
  tpExistStatus: boolean;
}

export interface PhoneCheckMethod {
  exist(data: ExistParamsType): void;
  verifyPhone(data: VerifyPhoneParams): void;
  setSignKey(data: string): void;
}

const PhoneCheckContainer: React.SFC<
PhoneCheckProps & PhoneCheckMethod & RouteComponentProps
> = ({
  exist,
  verifyPhone,
  verifyStatus,
  history,
  match,
  location,
  existStatus,
  tpExistStatus,
  signKeyExistStatus,
  setSignKey,
}) => (
  <PhoneCheckComponent
    exist={exist}
    history={history}
    match={match}
    location={location}
    verifyPhone={verifyPhone}
    verifyStatus={verifyStatus}
    existStatus={existStatus}
    signKeyExistStatus={signKeyExistStatus}
    tpExistStatus={tpExistStatus}
    setSignKey={setSignKey}
  />
);

const mapStateToProps = ({ register, exist }: AppState) => ({
  verifyStatus: register.verifyStatus,
  existStatus: exist.existStatus,
  tpExistStatus: exist.tpExistStatus,
  signKeyExistStatus: exist.signKeyExistStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<registerReducerActions & existReducerActions>) => ({
  exist: bindActionCreators(existActions.exist, dispatch),
  verifyPhone: bindActionCreators(registerActions.verifyPhone, dispatch),
  setSignKey: bindActionCreators(registerActions.setSignKey, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PhoneCheckContainer),
);
