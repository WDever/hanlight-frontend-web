import { CalendarMethod, CalendarProps } from 'container/main/calendar';
import ErrorPng from 'lib/png/hugo-fatal-error.png';
import { ErrorImg } from 'lib/styles';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import CalendarItem from './calendarItem';

const { useEffect } = React;

const CalendarWrapper = styled.div`
  width: 81rem;
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
  let key = 0;
  const CalendarList =
    calendarRecentStatus === 'success' &&
    calendarList.map((item, idx) => {
      if (idx <= 3) {
        return (
          <CalendarItem
            year={item.year}
            month={item.month}
            day={item.date}
            contents={item.detail}
            active={moment().format('D') === item.date}
            key={key++}
          />
        );
      }
    });

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
