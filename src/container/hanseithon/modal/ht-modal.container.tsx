import HTModalComponent from 'components/hanseithon/modal';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, ModalTypes, CategoryType, JobType, hanseithonReducerActions, hanseithonActions, userReducerActions, PostTeamParams, PutTeamParams, PostTeamMatchParams } from 'store';

export interface HTModalProps {
  modalType: ModalTypes;
  accessToken: string;
}

export interface HTModalMethod {
  postTeam(payload: PostTeamParams): void;
  putTeam(payload: PutTeamParams): void;
  postTeamMatch(payload: PostTeamMatchParams): void;
}

export interface HTModalOwnProps {}

const mapStateToProps = ({ hanseithon, user }: AppState) => ({
  modalType: hanseithon.modalType,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<hanseithonReducerActions | userReducerActions>) => ({
  postTeam: bindActionCreators(hanseithonActions.postTeam, dispatch),
  putTeam: bindActionCreators(hanseithonActions.putTeam, dispatch),
  postTeamMatch: bindActionCreators(hanseithonActions.postMatchTeam, dispatch),
});

const HTModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTModalComponent);

export default HTModalContainer;
