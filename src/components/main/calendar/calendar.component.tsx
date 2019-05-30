import * as React from 'react';
import styled from 'styled-components';
import { ErrorImg } from 'lib/styles';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import moment from 'moment';
import { CalendarProps, CalendarMethod } from 'container/main/calendar';
import CalendarItem from './calendarItem';

const { useEffect } = React;

const ScheduleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

const CalendarComponent: React.FC<CalendarProps & CalendarMethod> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
}) => {
  const access_token = localStorage.getItem('accessToken');
  const Month = moment().format('M');
  let key = 0;
  const CalendarList = calendarRecentStatus === 'success'
    && calendarList.map((item, idx) => {
      if (idx <= 2) {
        return (
          <CalendarItem
            date={`${moment().format('Y')}년 ${
              Month !== item.month ? String(Number(Month) + 1) : Month
            } 월 ${item.date} 일`}
            contents={item.detail}
            active={moment().format('D') === item.date}
            key={key++}
          />
        );
      }
    });

  useEffect(() => {
    calendarRecentApi(access_token);
  }, [access_token, calendarRecentApi]);

  return (
    <ScheduleWrapper>
      {CalendarList}
      {calendarRecentStatus === 'failure' && <ErrorImg src={ErrorPng} alt="Error" />}
    </ScheduleWrapper>
  );
};

export default CalendarComponent;
