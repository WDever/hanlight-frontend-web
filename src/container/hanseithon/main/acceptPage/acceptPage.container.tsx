import AcceptPageComponent from 'components/hanseithon/main/acceptPage';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  hanseithonActions,
  hanseithonReducerActions,
  ModalTypes,
  userReducerActions,
} from 'store';

export interface AcceptPageProps {}

export interface AcceptPageMethod {
  deem(payload: boolean): void;
  agree(payload: boolean): void;
  modal(payload: ModalTypes): void;
}

export interface AcceptPageOwnProps {}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  agree: bindActionCreators(hanseithonActions.agree, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
});

const AcceptPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcceptPageComponent);

export default AcceptPageContainer;
