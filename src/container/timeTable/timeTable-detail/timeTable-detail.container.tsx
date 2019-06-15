import TimeTableComponent from 'components/timeTable/timeTable-detail';
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
  getTimetableStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
  grade: number | null;
  classNum: number | null;
  major: string | null;
}

export interface TimeTableMethod {
  getTimetable(param: string | null): void;
}

const TimeTableContainer: React.FC<
  TimeTableProps & TimeTableMethod & RouteComponentProps
> = ({
  timeTableList,
  getTimetable,
  getTimetableStatus,
  accessToken,
  grade,
  classNum,
  history,
  match,
  location,
  major,
}) => {
  return (
    <TimeTableComponent
      timeTableList={timeTableList}
      getTimetable={getTimetable}
      getTimetableStatus={getTimetableStatus}
      accessToken={accessToken}
      grade={grade}
      classNum={classNum}
      major={major}
      history={history}
      match={match}
      location={location}
    />
  );
};

const mapStateToProps = ({ timeTable, user }: AppState) => ({
  timeTableList: timeTable.timetable,
  getTimetableStatus: timeTable.getTimetableStatus,
  accessToken: user.accessToken,
  major: user.data.major,
  grade: user.data.grade,
  classNum: user.data.classNum,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  getTimetable: bindActionCreators(timeTableActions.getTimeTable, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TimeTableContainer),
);
