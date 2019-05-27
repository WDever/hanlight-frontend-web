import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CalendarProps, CalendarMethod } from 'container/main/calendar';
import { RouteComponentProps } from 'react-router-dom';
import CalendarItem from './calendarItem';

const { useEffect } = React;

const ScheduleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Schedule: React.FC<
CalendarProps & CalendarMethod & RouteComponentProps
> = ({
  calendarApi,
  calendarList,
  calendarStatus,
  history,
  match,
  location,
}) => {
  const access_token = localStorage.getItem('accessToken');
  const Month = moment().format('M');
  const Today = moment().format('D');
  const CalendarList = calendarStatus === 'success'
    && calendarList.map((item, idx) => {
      if (idx <= 2) {
        return (
          <CalendarItem
            date={`${moment().format('Y')}년 ${moment().format('M')} 월 ${
              item.date
            } 일`}
            contents={item.detail}
            active={Today === item.date}
          />
        );
      }
    });

  useEffect(() => {
    calendarApi({ access_token, month: moment().format('M') });
  }, [access_token, calendarApi]);

  return <ScheduleWrapper>{CalendarList}</ScheduleWrapper>;
};

export default Schedule;
