import HTMainComponent from 'components/hanseithon/main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  hanseithonActions,
  hanseithonReducerActions,
  HtUserType,
  MentorRequestType,
  MentorType,
  ModalTypes,
  PatchMentorRequestParams,
  userReducerActions,
} from 'store';

export interface HTMainProps {
  errMessage: string;
  accessToken: string;
  userType: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  getThemeStatus: 'none' | 'pending' | 'success' | 'failure';
  getJudgementStatus: 'none' | 'pending' | 'success' | 'failure';
  getMentorStatus: 'none' | 'pending' | 'success' | 'failure';
  getMentorRequestStatus: 'none' | 'pending' | 'success' | 'failure';
  themeUrl: string;
  judgementUrl: string;
  userName: string;
  htUserType: HtUserType;
  modalType: ModalTypes;
  userTeam: string | null;
  mentorList: MentorType[];
  mentorRequestList: MentorRequestType[];
  mentorPk: number;
  teamPk: number;
  reqPk: number;
}

export interface HTMainMethod {
  resetStatus(): void;
  getTheme(payload: string): void;
  getJudgement(payload: string): void;
  getHtUser(payload: string): void;
  modal(payload: ModalTypes): void;
  deem(payload: boolean): void;
  getMentor(payload: string): void;
  getMentorRequest(payload: string): void;
  setMentorPk(payload: number): void;
  setTeamPk(payload: number): void;
  setReqPk(payload: number): void;
  patchMentorRequest(payload: PatchMentorRequestParams): void;
}

export interface HTMainOwnProps {}

const mapStateToProps = ({ hanseithon, error, user }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
  errMessage: error.message,
  accessToken: user.accessToken,
  userType: user.type,
  postObserverStatus: hanseithon.postObserverStatus,
  getThemeStatus: hanseithon.getThemeStatus,
  getJudgementStatus: hanseithon.getJudgementStatus,
  themeUrl: hanseithon.themeUrl,
  judgementUrl: hanseithon.judgementUrl,
  userName: user.name,
  htUserType: hanseithon.htUserType,
  modalType: hanseithon.modalType,
  userTeam: hanseithon.userTeam,
  getMentorStatus: hanseithon.getMentorStatus,
  getMentorRequestStatus: hanseithon.getMentorRequestStatus,
  mentorList: hanseithon.mentorList,
  mentorRequestList: hanseithon.mentorRequestList,
  mentorPk: hanseithon.mentorPk,
  teamPk: hanseithon.teamPk,
  reqPk: hanseithon.reqPk,
});

const mapDispatchToProps = (
  dispatch: Dispatch<hanseithonReducerActions | userReducerActions>,
) => ({
  deem: bindActionCreators(hanseithonActions.deem, dispatch),
  postObserver: bindActionCreators(hanseithonActions.postObserver, dispatch),
  resetStatus: bindActionCreators(hanseithonActions.resetStatus, dispatch),
  getTheme: bindActionCreators(hanseithonActions.getTheme, dispatch),
  getJudgement: bindActionCreators(hanseithonActions.getJudgement, dispatch),
  getHtUser: bindActionCreators(hanseithonActions.getHtUser, dispatch),
  modal: bindActionCreators(hanseithonActions.modal, dispatch),
  getMentor: bindActionCreators(hanseithonActions.getMentor, dispatch),
  getMentorRequest: bindActionCreators(
    hanseithonActions.getMentorRequest,
    dispatch,
  ),
  setMentorPk: bindActionCreators(hanseithonActions.setMentorPk, dispatch),
  setTeamPk: bindActionCreators(hanseithonActions.setTeamPk, dispatch),
  patchMentorRequest: bindActionCreators(
    hanseithonActions.patchMentorRequest,
    dispatch,
  ),
  setReqPk: bindActionCreators(hanseithonActions.setReqPk, dispatch),
});

const HTMainContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HTMainComponent),
);

export default HTMainContainer;
