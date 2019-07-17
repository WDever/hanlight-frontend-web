import HTModalComponent from 'components/hanseithon/modal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, ModalTypes } from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
}

export interface HTModalMethod {}

export interface HTModalOwnProps {}

const mapStateToProps = ({ hanseithon }: AppState) => ({
  modalType: hanseithon.modalType,
});

const mapDispatchToProps = () => ({});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
