import HTModalComponent from 'components/hanseithon/modal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  CategoryType,
  hanseithonActions,
  hanseithonReducerActions,
  JobType,
  ModalTypes,
  PostTeamMatchParams,
  PostTeamParams,
  PutTeamParams,
  userReducerActions,
} from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
  accessToken: string;
}

export interface HTModalMethod {
  postTeam(payload: PostTeamParams): void;
  putTeam(payload: PutTeamParams): void;
  postTeamMatch(payload: PostTeamMatchParams): void;
  deem(payload: boolean): void;
  modal(payload: ModalTypes): void;
}

export interface HTModalOwnProps {}

const mapStateToProps = ({ hanseithon, user }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  postTeam: bindActionCreators(hanseithonActions.postTeam, dispatch),
  putTeam: bindActionCreators(hanseithonActions.putTeam, dispatch),
  postTeamMatch: bindActionCreators(hanseithonActions.postMatchTeam, dispatch),
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
