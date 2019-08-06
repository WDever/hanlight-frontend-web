import ProfileComponent from 'components/profile';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  errorActions,
  errorReducerActions,
  PatchPhoneParam,
  PatchPwParam,
  PostProfilePicParmas,
  userActions,
  userReducerActions,
} from 'store';

export interface ProfileProps {
  accessToken: string;
  name: string;
  id: string;
  type: 'none' | 'student' | 'teacher' | 'graduate' | 'parent';
  major: string | null;
  grade: number | null;
  classNum: number | null;
  patchPasswordStatus: 'none' | 'pending' | 'success' | 'failure';
  patchPhoneStatus: 'none' | 'pending' | 'success' | 'failure';
  postProfilePicStatus: 'none' | 'pending' | 'success' | 'failure';
  errorMessage: string;
  errorCode: number;
}

export interface ProfileMethod {
  patchPassword: (payload: PatchPwParam) => void;
  patchPhone: (payload: PatchPhoneParam) => void;
  resetError: () => void;
  postProfilePic(payload: PostProfilePicParmas): void;
}

const mapStateToProps = ({ user, error }: AppState) => ({
  accessToken: user.accessToken,
  type: user.type,
  major: user.major,
  grade: user.grade,
  classNum: user.classNum,
  name: user.name,
  id: user.id,
  patchPasswordStatus: user.patchPasswordStatus,
  patchPhoneStatus: user.patchPhoneStatus,
  errorCode: error.code,
  errorMessage: error.message,
  postProfilePicStatus: user.postProfilePicStatus,
});

const mapDispatchToProps = (
  dispatch: Dispatch<userReducerActions & errorReducerActions>,
) => ({
  patchPassword: bindActionCreators(userActions.patchPassword, dispatch),
  patchPhone: bindActionCreators(userActions.patchPhone, dispatch),
  resetError: bindActionCreators(errorActions.resetError, dispatch),
  postProfilePic: bindActionCreators(userActions.postProfilePic, dispatch),
});

const ProfileContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileComponent),
);

export default ProfileContainer;
