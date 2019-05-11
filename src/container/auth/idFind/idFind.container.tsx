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
} from 'store';
import IdFindComponent from 'components/auth/idFind';

export interface IdFindProps {
  idFindStatus: 'none' | 'pending' | 'success' | 'failure';
  existStatus: 'none' | 'pending' | 'success' | 'failure';
  tpExistStatus: boolean;
  id: string;
}

export interface IdFindMethod {
  idFind(code: string): void;
  exist(data: ExistParamsType): void;
}

const IdFindContainer: React.FC<
IdFindProps & IdFindMethod & RouteComponentProps
> = ({
  idFind,
  idFindStatus,
  existStatus,
  tpExistStatus,
  exist,
  id,
  history,
  match,
  location,
}) => (
  <IdFindComponent
    idFind={idFind}
    idFindStatus={idFindStatus}
    history={history}
    match={match}
    location={location}
    existStatus={existStatus}
    tpExistStatus={tpExistStatus}
    exist={exist}
    id={id}
  />
);

const mapStateToProps = ({ user, exist }: AppState) => ({
  idFindStatus: user.idFindStatus,
  tpExistStatus: exist.tpExistStatus,
  existStatus: exist.existStatus,
  id: user.id,
});

const mapDispatchToProps = (dispatch: Dispatch<userReducerActions & existReducerActions>) => ({
  idFind: bindActionCreators(userActions.idFind, dispatch),
  exist: bindActionCreators(existActions.exist, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(IdFindContainer),
);
