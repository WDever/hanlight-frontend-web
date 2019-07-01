import AutoErrorCheckComponent from 'components/auto/autoErrorCheck';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from 'store';

export interface AutoErrorCheckProps {
  onError: number;
  code: number;
  message: string;
  name: string;
  time: number | null;
}

const mapStateToProps = ({ error }: AppState) => ({
  onError: error.onError,
  code: error.code,
  message: error.message,
  name: error.name,
  time: error.time,
});

const AutoErrorCheckContainer = withRouter(
  connect(mapStateToProps)(AutoErrorCheckComponent),
);

export default AutoErrorCheckContainer;
