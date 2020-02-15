import CalendarComponent from 'components/calendar/main-calendar';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  calendarActions,
  CalendarRecentItem,
  calendarReducerActions,
} from 'store';

export interface MainCalendarProps {
  calendarList: CalendarRecentItem[];
  getCalendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainCalendarMethod {
  getCalendarRecent(params: string | null): void;
}

const MainCalendarContainer: React.FC<MainCalendarProps &
  MainCalendarMethod> = ({
  getCalendarRecent,
  calendarList,
  getCalendarRecentStatus,
  accessToken,
}) => (
  <CalendarComponent
    getCalendarRecent={getCalendarRecent}
    calendarList={calendarList}
    getCalendarRecentStatus={getCalendarRecentStatus}
    accessToken={accessToken}
  />
);

const mapStateToProps = ({ user, calendar }: AppState) => ({
  calendarList: calendar.calendarRecent,
  getCalendarRecentStatus: calendar.getCalendarRecentStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<calendarReducerActions>) => ({
  getCalendarRecent: bindActionCreators(
    calendarActions.getCalendarRecent,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainCalendarContainer);
