import BoardReportComponent from 'components/board/report';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  ActiveReportData,
  AppState,
  boardActions,
  boardReducerActions,
  ReportParams,
} from 'store';

export interface BoardReportProps {
  reportStatus: 'none' | 'pending' | 'success' | 'failure';
  ActiveReportData: ActiveReportData;
  accessToken: string;
}

export interface BoardReportMethod {
  deemBoard: (payload: boolean) => void;
  activeReport: (data: ActiveReportData) => void;
  report: (payload: ReportParams) => void;
}

export interface BoardReportOwnProps {
  setReportToggle(value: React.SetStateAction<boolean>): void;
}

const mapStateToProps = (
  { board, user }: AppState,
  ownProps: BoardReportOwnProps,
) => ({
  reportStatus: board.reportStatus,
  ActiveReportData: board.activeReportData,
  accessToken: user.accessToken,
  ...ownProps,
});

const mapDispatchProps = (dispatch: Dispatch<boardReducerActions>) => ({
  deemBoard: bindActionCreators(boardActions.deemBoard, dispatch),
  report: bindActionCreators(boardActions.report, dispatch),
  activeReport: bindActionCreators(boardActions.activeReport, dispatch),
});

const BoardReportContainer = connect(
  mapStateToProps,
  mapDispatchProps,
)(BoardReportComponent);

export default BoardReportContainer;
