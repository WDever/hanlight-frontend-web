import ProfileComponent from 'components/user/profile';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  errorActions,
  errorReducerActions,
  PatchPhoneParam,
  PatchPwParam,
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
  errorMessage: string;
  errorCode: number;
}

export interface ProfileMethod {
  patchPassword: (payload: PatchPwParam) => void;
  patchPhone: (payload: PatchPhoneParam) => void;
  resetError: () => void;
}

const mapStateToProps = ({ user, error }: AppState) => ({
  accessToken: user.accessToken,
  type: user.data.type,
  major: user.data.major,
  grade: user.data.grade,
  classNum: user.data.classNum,
  name: user.data.name,
  id: user.data.id,
  patchPasswordStatus: user.patchPasswordStatus,
  patchPhoneStatus: user.patchPhoneStatus,
  errorCode: error.code,
  errorMessage: error.message,
});

const mapDispatchToProps = (
  dispatch: Dispatch<userReducerActions & errorReducerActions>,
) => ({
  patchPassword: bindActionCreators(userActions.patchPassword, dispatch),
  patchPhone: bindActionCreators(userActions.patchPhone, dispatch),
  resetError: bindActionCreators(errorActions.resetError, dispatch),
});

const ProfileContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileComponent),
);

export default ProfileContainer;
