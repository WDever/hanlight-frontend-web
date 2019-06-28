import * as React from 'react';

import CalendarItem from 'components/calendar/calendarItem';
import {
  DetailCalendarMethod,
  DetailCalendarProps,
} from 'container/calendar/detail-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';

const { useEffect, useState } = React;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 81rem;
  width: 90%;
  min-height: 100%;
`;

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 3rem;

  span {
    font-family: 'yg-jalnan';
    font-size: 2.25rem;
  }
`;

const MonthBar = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
  align-items: flex-end;

  span {
    font-family: 'yg-jalnan';
    font-size: 1.125rem;
  }
`;

const MonthItem = styled.span<{ now: boolean }>`
  color: ${props => (props.now ? '#4470ff' : '#a9a9a9')};
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  flex-flow: row wrap; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CalendarLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DetailCalendarComponent: React.FC<
  DetailCalendarMethod & DetailCalendarProps
> = ({ getCalendar, getCalendarStatus, accessToken, calendar }) => {
  const [selectedMonth, setSelecetedMonth] = useState<string>(
    moment().format('M'),
  );
  const monthList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const MonthList = monthList.map((item, i) => {
    return (
      <MonthItem
        key={i}
        now={item === selectedMonth}
        onClick={() => setSelecetedMonth(item)}
      >
        {item}월
      </MonthItem>
    );
  });

  const CalendarList =
    getCalendarStatus === 'success'
      ? calendar.map((item, i) => {
          const today =
            moment().format('M.D') === `${selectedMonth}.${item.date}`;

          return (
            <CalendarItem
              year={moment().format('YYYY')}
              month={selectedMonth}
              day={item.date}
              contents={item.detail}
              today={today}
              key={i}
              type="detail"
            />
          );
        })
      : [];

  useEffect(() => {
    getCalendar({
      accessToken,
      month: selectedMonth,
      year: moment().format('YYYY'),
    });
  }, [selectedMonth]);

  return (
    <Wrapper>
      <TitleBar>
        <span>학사일정</span>
        <MonthBar>{MonthList}</MonthBar>
      </TitleBar>
      <CalendarWrapper>{CalendarList}</CalendarWrapper>
    </Wrapper>
  );
};

export default DetailCalendarComponent;
