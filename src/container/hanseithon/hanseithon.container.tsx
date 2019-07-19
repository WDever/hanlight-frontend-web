import HanseithonComponent from 'components/hanseithon';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from 'store';

export interface HanseiThonProps {
  deemStatus: boolean;
}

const mapStateToProps = ({ hanseithon }: AppState) => ({
  deemStatus: hanseithon.deemStatus,
});

const mapDispatchToProps = ({}) => ({});

const HanseithonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HanseithonComponent);

export default HanseithonContainer;
