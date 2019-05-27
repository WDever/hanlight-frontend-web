import * as React from 'react';
import CalendarComponent from 'components/main/calendar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, utilsActions, utilsReducerActions, CalendarParams, CalendarItem } from 'store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface CalendarProps {
  calendarList: CalendarItem[];
  calendarStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface CalendarMethod {
  calendarApi(params: CalendarParams): void;
}

const ScheduleContainer: React.FC<CalendarProps & CalendarMethod & RouteComponentProps> = ({
  calendarApi,
  calendarList,
  calendarStatus,
  history,
  match,
  location,
}) => {
  return (
    <CalendarComponent
      calendarApi={calendarApi}
      calendarList={calendarList}
      calendarStatus={calendarStatus}
      history={history}
      match={match}
      location={location}
    />
  );
};

const mapStateToProps = ({ utils }: AppState) => ({
  calendarList: utils.calendar,
  calendarStatus: utils.calendarStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  calendarApi: bindActionCreators(utilsActions.calendar, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScheduleContainer),
);
