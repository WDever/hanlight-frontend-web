import AutoErrorCheckComponent from 'components/auto/autoErrorCheck';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  errorActions,
  errorReducerActions,
  ErrorResponse,
} from 'store';

export interface AutoErrorCheckProps {
  onError: number;
  code: number;
  message: string;
  name: string;
  time: number | null;
}

export interface AutoErrorCheckMethod {
  setError: (payload: ErrorResponse) => void;
}

const mapStateToProps = ({ error }: AppState) => ({
  onError: error.onError,
  code: error.code,
  message: error.message,
  name: error.name,
  time: error.time,
});

const mapDispatchToProps = (dispatch: Dispatch<errorReducerActions>) => ({
  setError: bindActionCreators(errorActions.setError, dispatch),
});

const AutoErrorCheckContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AutoErrorCheckComponent),
);

export default AutoErrorCheckContainer;
