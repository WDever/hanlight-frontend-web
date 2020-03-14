import {
  MainTimeTableMethod,
  MainTimeTableProps,
} from 'container/timeTable/main-timeTable';
import { Device } from 'lib/styles';
import moment from 'moment';
import React, { useEffect, ReactNodeArray } from 'react';
import styled from 'styled-components';
import { MainCardWrapper } from 'lib/styles/MainCard';
import TimeTableItem from './timeTableItem';

/* eslint-disable @typescript-eslint/typedef */

const TimeTableWrapper = styled(MainCardWrapper)`
  .title {
    margin-bottom: 1.5625rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 1.75rem 2.25rem;
`;

const EmptyItem = styled.div`
  width: 8.125rem;
  height: 8.125rem;

  border-radius: 1rem;

  background-color: ${({ theme }): string =>
    theme.mainCard.timetable.inactiveItemColor};

  @media ${Device.laptopS} {
    width: 13%;
    height: 10rem;
  }
  @media ${Device.tabletL} {
    width: 7.05rem;
    height: 8.45rem;
    margin-right: 1.07rem;
    border-radius: 1rem;
  }
  @media ${Device.mobileL} {
    width: 5.1rem;
    height: 6.12rem;
  }
`;

/* eslint-enable @typescript-eslint/typedef */

const hour: number = 3600;
const minute: number = 60;

const MainTimeTableComponent: React.FC<MainTimeTableProps &
  MainTimeTableMethod> = ({
  getTimetableApi,
  accessToken,
  timeTableList,
}: MainTimeTableProps & MainTimeTableMethod) => {
  // const today: number = moment().get('day');
  const today: number = 5;

  useEffect(() => {
    getTimetableApi(accessToken);
  }, []);

  const TimeTableList: ReactNodeArray = [...Array(8)].map(
    (value: null, index: number) => {
      if (
        timeTableList[today].length === 0 ||
        timeTableList[today][index] === undefined
      ) {
        return <EmptyItem key={index} />;
      }

      const sum: number =
        moment().get('hour') * hour +
        moment().get('minute') * minute +
        moment().get('second');

      const period: () => number = (): number => {
        if (sum >= 15 * hour + 10 * minute) {
          return 7;
        }
        if (sum >= 14 * hour + 0 * minute) {
          return 6;
        }
        if (sum >= 12 * hour + 20 * minute) {
          return 5;
        }
        if (sum >= 11 * hour + 30 * minute) {
          return 4;
        }
        if (sum >= 10 * hour + 30 * minute) {
          return 3;
        }
        if (sum >= 9 * hour + 30 * minute) {
          return 2;
        }
        return 1;
      };

      return (
        <TimeTableItem
          sub={timeTableList[today][index]}
          // active={index + 1 === period()}
          active
          key={index}
        />
      );
    },
  );

  return (
    <TimeTableWrapper>
      <h1 className='title'>이민혁님의 시간표</h1>
      <ListWrapper>{TimeTableList}</ListWrapper>
    </TimeTableWrapper>
  );
};

export default MainTimeTableComponent;
