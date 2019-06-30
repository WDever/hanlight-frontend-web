import * as React from 'react';

import CalendarItem from 'components/calendar/calendarItem';
import {
  DetailCalendarMethod,
  DetailCalendarProps,
} from 'container/calendar/detail-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import styled, { css } from 'styled-components';

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
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 3rem;

  span {
    font-family: 'yg-jalnan';
    font-size: 2.25rem;
  }
`;

const DateBar = styled.div`
  width: 16.6%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  span {
    font-family: 'yg-jalnan';
    font-size: 1.125rem;
  }
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 6.25rem;
  height: 2.25rem;
  border: solid 1px #707070;
  background-color: #ffffff;
  border-radius: 0;
  font-family: 'Spoqa Han Sans';
  text-align-last: center;
  font-size: 1rem;
  outline: none;
`;

const CalendarWrapper = styled.div<{ listLength: number }>`
  ${({ listLength }) =>
    listLength !== 0
      ? css`
          width: 105%;
          display: grid;
          margin: 0 -1.05rem;
          grid-template-columns: repeat(5, 20%);
        `
      : css`
          width: 90%;
          display: flex;
          position: absolute;
          justify-content: center;
          align-items: center;
          z-index: -2;
        `}

  min-height: 92%;

  p {
    font-size: 2rem;
    font-family: 'Spoqa Han Sans';
  }
`;

const DetailCalendarComponent: React.FC<
  DetailCalendarMethod & DetailCalendarProps
> = ({ getCalendar, getCalendarStatus, accessToken, calendar }) => {
  const [selectedMonth, setSelecetedMonth] = useState<string>(
    moment().format('M'),
  );
  const [selectedYear, setSelecetedYear] = useState<string>(
    moment().format('YYYY'),
  );

  const handleSelectedMonth = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setSelecetedMonth(value);
  };

  const handleSelectedYear = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setSelecetedYear(value);
  };

  const yearList = ['2019', '2020'];

  const MonthList = Array(12)
    .fill(null)
    .map((item, i) => {
      return (
        <option key={i} selected={String(i + 1) === selectedMonth} value={i + 1}>
          {item}월
        </option>
      );
    });

  const YearList = yearList.map((item, i) => {
    return (
      <option key={i} selected={item === selectedYear} value={item}>
        {item}년
      </option>
    );
  });

  const CalendarList =
    getCalendarStatus === 'success' && calendar.length !== 0 ? (
      calendar.map((item, i) => {
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
    ) : (
      <p>학사일정이 없습니다!</p>
    );

  useEffect(() => {
    getCalendar({
      accessToken,
      month: selectedMonth,
      year: selectedYear,
    });
  }, [selectedMonth, selectedYear]);

  return (
    <Wrapper>
      <TitleBar>
        <span>학사일정</span>
        <DateBar>
          <Select value={selectedYear} onChange={handleSelectedYear}>
            {YearList}
          </Select>
          <Select value={selectedMonth} onChange={handleSelectedMonth}>
            {MonthList}
          </Select>
        </DateBar>
      </TitleBar>
      <CalendarWrapper listLength={calendar.length}>
        {CalendarList}
      </CalendarWrapper>
    </Wrapper>
  );
};

export default DetailCalendarComponent;
