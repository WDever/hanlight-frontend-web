import * as React from 'react';

import {
  DetailCalendarMethod,
  DetailCalendarProps,
} from 'container/calendar/detail-calendar';
import { Device } from 'lib/styles';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import DetailCalendarItem from './item';

const { useEffect, useState } = React;

const Wrapper = styled.div`
  width: 90%;
  max-width: 81rem;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-bottom: 7rem;

  @media ${Device.tabletL} {
    width: 80%;
    max-width: unset;
  }
  @media ${Device.mobileL} {
    width: 90%;
  }
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

    @media ${Device.tabletL} {
      font-size: 1.82rem;
    }
    @media ${Device.mobileL} {
      font-size: 1rem;
    }
  }
  @media ${Device.tabletL} {
    margin-bottom: 3.28rem;
    margin-top: 2.81rem;
  }
  @media ${Device.mobileL} {
    margin-bottom: 1.75rem;
    margin-top: 1.75rem;
  }
`;

const DateBar = styled.div`
  width: 13.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media ${Device.tabletL} {
    width: 11.58rem;
  }
  @media ${Device.mobileL} {
    width: 6.125rem;
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

  @media ${Device.tabletL} {
    width: 5.56rem;
    height: 2.31rem;
    font-size: 1.125rem;
  }
  @media ${Device.mobileL} {
    width: 3rem;
    height: 1.25rem;
    font-size: 0.625rem;
  }
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 12.5rem);
  grid-column-gap: 0.5rem;
  grid-row-gap: 4.4rem;
  justify-content: space-between;

  p {
    font-size: 2rem;
    font-family: 'Spoqa Han Sans';
  }

  @media ${Device.tabletL} {
    grid-template-columns: repeat(auto-fit, 11.125rem);
    grid-column-gap: 1.85rem;
  }
  @media ${Device.mobileL} {
    grid-template-columns: repeat(auto-fit, 6rem);
    grid-column-gap: 0.25rem;
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
        <option
          key={i}
          selected={String(i + 1) === selectedMonth}
          value={i + 1}
        >
          {i + 1}월
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
    calendar.length !== 0 ? (
      calendar.map((item, i) => {
        const today =
          moment().format('Y.M.D') ===
          `${selectedYear}.${selectedMonth}.${item.date}`;

        return (
          <DetailCalendarItem
            year={selectedYear}
            month={selectedMonth}
            date={item.date}
            contents={item.detail}
            today={today}
            key={i}
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
      {getCalendarStatus === 'success' && (
        <CalendarWrapper>{CalendarList}</CalendarWrapper>
      )}
      {getCalendarStatus === 'pending' && (
        <p style={{ fontFamily: 'Spoqa Han Sans' }}>불러오는중 ... </p>
      )}
    </Wrapper>
  );
};

export default DetailCalendarComponent;
