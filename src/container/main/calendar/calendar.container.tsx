import * as React from 'react';
import CalendarComponent from 'components/main/calendar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, utilsActions, utilsReducerActions, CalendarParams, CalendarRecentItem } from 'store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface CalendarProps {
  calendarList: CalendarRecentItem[];
  calendarRecentStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface CalendarMethod {
  calendarRecentApi(params: string | null): void;
}

const ScheduleContainer: React.FC<CalendarProps & CalendarMethod & RouteComponentProps> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
  history,
  match,
  location,
}) => {
  return (
    <CalendarComponent
      calendarRecentApi={calendarRecentApi}
      calendarList={calendarList}
      calendarRecentStatus={calendarRecentStatus}
      history={history}
      match={match}
      location={location}
    />
  );
};

const mapStateToProps = ({ utils }: AppState) => ({
  calendarList: utils.calendarRecent,
  calendarRecentStatus: utils.calendarRecentStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  calendarRecentApi: bindActionCreators(utilsActions.calendarRecent, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScheduleContainer),
);
