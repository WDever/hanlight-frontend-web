import TimeTableComponent from 'components/timeTable/detail-timeTable';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, timeTableActions, timeTableReducerActions } from 'store';

export interface DetailTimeTableProps {
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

export interface DetailTimeTableMethod {
  getTimetable(param: string | null): void;
}

const DetailTimeTableContainer: React.FC<
  DetailTimeTableProps & DetailTimeTableMethod & RouteComponentProps
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
  major: user.major,
  grade: user.grade,
  classNum: user.classNum,
});

const mapDispatchToProps = (dispatch: Dispatch<timeTableReducerActions>) => ({
  getTimetable: bindActionCreators(timeTableActions.getTimeTable, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DetailTimeTableContainer),
);
