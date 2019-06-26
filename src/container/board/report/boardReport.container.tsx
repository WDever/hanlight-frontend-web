import BoardReportComponent from 'components/board/report';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  ReportData,
  ReportParams,
} from 'store';

export interface BoardReportProps {
  reportStatus:
    | 'none'
    | 'pending'
    | 'success-comment'
    | 'success-board'
    | 'failure-board'
    | 'failure-comment';
  reportData: ReportData;
  accessToken: string;
}

export interface BoardReportMethod {
  deemBoard: (payload: boolean) => void;
  reportActive: (data: ReportData) => void;
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
  reportData: board.reportData,
  accessToken: user.accessToken,
  ...ownProps,
});

const mapDispatchProps = (dispatch: Dispatch<boardReducerActions>) => ({
  deemBoard: bindActionCreators(boardActions.deemBoard, dispatch),
  report: bindActionCreators(boardActions.report, dispatch),
  reportActive: bindActionCreators(boardActions.reportActive, dispatch),
});

const BoardReportContainer = connect(
  mapStateToProps,
  mapDispatchProps,
)(BoardReportComponent);

export default BoardReportContainer;
