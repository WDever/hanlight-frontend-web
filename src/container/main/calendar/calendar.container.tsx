import * as React from 'react';
import CalendarComponent from 'components/main/calendar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  calendarActions,
  calendarReducerActions,
  CalendarRecentItem,
} from 'store';

export interface CalendarProps {
  calendarList: CalendarRecentItem[];
  calendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface CalendarMethod {
  calendarRecentApi(params: string | null): void;
}

const ScheduleContainer: React.FC<CalendarProps & CalendarMethod> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
}) => (
  <CalendarComponent
    calendarRecentApi={calendarRecentApi}
    calendarList={calendarList}
    calendarRecentStatus={calendarRecentStatus}
  />
);

const mapStateToProps = ({ calendar }: AppState) => ({
  calendarList: calendar.calendarRecent,
  calendarRecentStatus: calendar.calendarRecentStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<calendarReducerActions>) => ({
  calendarRecentApi: bindActionCreators(calendarActions.calendarRecent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleContainer);
