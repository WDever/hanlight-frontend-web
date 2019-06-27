import ErrorComponent from 'components/error';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, Board, boardActions, boardReducerActions } from 'store';

export interface ErrorProps {
  code: number;
  message: string;
  name: string;
}

const mapStateToProps = ({ error }: AppState) => ({
  code: error.code,
  message: error.message,
  name: error.name,
});

const mapDispatchToProps = () => ({});

const ErrorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorComponent);

export default ErrorContainer;
