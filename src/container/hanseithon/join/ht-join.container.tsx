import HTJoinComponent from 'components/hanseithon/join';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanseithonActions,
  hanseithonReducerActions,
  ModalTypes,
  userReducerActions,
} from 'store';

export interface HTJoinProps {
  modalType: ModalTypes;
  deemStatus: boolean;
  agreeStatus: boolean;
}

export interface HTJoinMethod {
  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
}

export interface HTJoinOwnProps {}

const mapStateToProps = ({ hanseithon }: AppState) => ({
  modalType: hanseithon.modalType,
  deemStatus: hanseithon.deemStatus,
  agreeStatus: hanseithon.agreeStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
});

const HTJoinContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTJoinComponent),
);

export default HTJoinContainer;
