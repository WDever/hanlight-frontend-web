import * as React from 'react';

import {
  MainCalendarMethod,
  MainCalendarProps,
} from 'container/calendar/main-calendar';
import { Device } from 'lib/styles';
import moment from 'moment';
import styled from 'styled-components';
import MainCalendarItem from './item';

const { useEffect } = React;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  @media ${Device.tablet} {
    width: unset;
  }
`;

const MainCalendarComponent: React.FC<
  MainCalendarProps & MainCalendarMethod
> = ({
  getCalendarRecent,
  calendarList,
  getCalendarRecentStatus,
  accessToken,
}) => {
  const CalendarList =
    getCalendarRecentStatus === 'success'
      ? calendarList.slice(0, 4).map((item, index) => {
          const today =
            moment().format('l') ===
            moment({
              year: item.year,
              month: item.month - 1,
              date: item.date,
            }).format('l');

          return (
            <MainCalendarItem
              year={item.year}
              month={item.month}
              day={item.date}
              contents={item.detail}
              today={today}
              key={index}
            />
          );
        })
      : [];

  useEffect(() => {
    getCalendarRecent(accessToken);
  }, [accessToken]);

  return <CalendarWrapper>{CalendarList}</CalendarWrapper>;
};

export default MainCalendarComponent;
