import { CalendarMethod, CalendarProps } from 'container/main/calendar';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import CalendarItem from './calendarItem';

const { useEffect } = React;

const CalendarWrapper = styled.div`
  max-width: 81rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const CalendarComponent: React.FC<CalendarProps & CalendarMethod> = ({
  calendarRecentApi,
  calendarList,
  calendarRecentStatus,
  accessToken,
}) => {
  const CalendarList =
    calendarRecentStatus === 'success'
      ? calendarList.splice(0, 4).map((item, index) => {
          const today =
            moment().format('YYYY.MM.DD') ===
            moment(`${item.year}.${item.month}.${item.date}`).format(
              'YYYY.MM.DD',
            );

          return (
            <CalendarItem
              year={item.year}
              month={item.month}
              day={item.date}
              contents={item.detail}
              active={moment().format('D') === item.date}
              today={today}
              key={index}
            />
          );
        })
      : [];

  useEffect(() => {
    calendarRecentApi(accessToken);
  }, [accessToken, calendarRecentApi]);

  return (
    <CalendarWrapper>
      {CalendarList}
      {calendarRecentStatus === 'failure' && (
        <ErrorImg src={ErrorPng} alt="Error" />
      )}
    </CalendarWrapper>
  );
};

export default CalendarComponent;
