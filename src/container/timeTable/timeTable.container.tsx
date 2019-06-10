import TimeTableComponent from 'components/timeTable';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, timeTableActions, timeTableReducerActions } from 'store';

export interface TimeTableProps {
  timeTableList: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[]
  ];
  timetableStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
  grade: number | null;
  classNum: number | null;
}

export interface TimeTableMethod {
  timetableApi(param: string | null): void;
}

const TimeTableContainer: React.FC<
  TimeTableProps & TimeTableMethod & RouteComponentProps
> = ({
  timeTableList,
  timetableApi,
  timetableStatus,
  accessToken,
  grade,
  classNum,
  history,
  match,
  location,
}) => {
  return (
    <TimeTableComponent
      timeTableList={timeTableList}
      timetableApi={timetableApi}
      timetableStatus={timetableStatus}
      accessToken={accessToken}
      grade={grade}
      classNum={classNum}
      history={history}
      match={match}
      location={location}
    />
  );
};

const mapStateToProps = ({ timeTable, user }: AppState) => ({
  timeTableList: timeTable.timetable,
  timetableStatus: timeTable.timetableStatus,
  accessToken: user.accessToken,
  grade: user.data.grade,
  classNum: user.data.classNum,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  timetableApi: bindActionCreators(timeTableActions.timeTable, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TimeTableContainer),
);
