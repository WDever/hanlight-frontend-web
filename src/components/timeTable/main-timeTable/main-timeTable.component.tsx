import {
  MainTimeTableMethod,
  MainTimeTableProps,
} from 'container/timeTable/main-timeTable';
import moment from 'moment';
import React, { useEffect, ReactNodeArray, useState } from 'react';
import styled from 'styled-components';
import { MainCardWrapper } from 'lib/styles/MainCard';
import TimeTableItem from './timeTableItem';
import TimetableSwitchComponent from './timetable-switch';

/* eslint-disable @typescript-eslint/typedef */

const TimeTableWrapper = styled(MainCardWrapper)`
  .title {
    margin-bottom: 1.5625rem;

    display: flex;
    justify-content: space-between;
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
  const [isChecked, setIsChecked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState<boolean>(false);
  // const today: number = moment().get('day');
  const today: number = 5;

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

  const handleSwitch: () => void = (): void => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    getTimetableApi(accessToken);
  }, []);

  return (
    <TimeTableWrapper>
      <h1 className='title'>
        이민혁님의 시간표{' '}
        <TimetableSwitchComponent
          isChanged={false}
          isChecked={isChecked}
          handleSwitch={handleSwitch}
        />
      </h1>
      <ListWrapper>{TimeTableList}</ListWrapper>
    </TimeTableWrapper>
  );
};

export default MainTimeTableComponent;
